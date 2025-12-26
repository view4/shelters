import { Injectable } from '@nestjs/common';
import { INVOICE_EVENTS, PAYMENT_INTENT_EVENTS, SUBSCRIPION_EVENTS } from './stripe.const';
import Stripe from 'stripe';
import { AuthService } from 'src/auth/auth.service';
import { ConfigService } from '@nestjs/config';
import { MembershipService } from 'src/auth/membership.service';
import { InjectModel } from '@nestjs/mongoose';
import { Subscription } from './schemas/subscription.schema';
import { filterOne, upsertOne } from 'src/common/utils/db';
import mongoose, { Model } from 'mongoose';
import { SubscriptionPayment } from './schemas/subscription-payment.schema';

@Injectable()
export class StripeService {
  stripe: Stripe;
  environment: string;
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private membershipService: MembershipService,
    @InjectModel(Subscription.name) private subscriptionModel: Model<Subscription>,
    @InjectModel(SubscriptionPayment.name) private subscriptionPaymentModel: Model<SubscriptionPayment>,
  ) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY'),
    );
    this.environment = this.configService.get<string>('ENV');
  }


  async handleEvent(event: Record<string, string>) {

    console.log('[StripeService] Incoming Event:', event);

    const handler =
      this.EVENT_TREE[event?.type] ||
      this.EVENT_TREE[PAYMENT_INTENT_EVENTS.NULL];

    if (!handler) {
      console.warn(`[StripeService] No handler found for event type: ${event?.type}`);
      return;
    }

    return handler(event);
  }

  async createStripeCustomer(userId) {
    const user = await this.authService.getUser(userId);
    const customer = await this.stripe.customers.create({
      email: user.email,
      name: "User Name Here",
      metadata: {
        userId: `${userId}`,
        environment: this.environment,
      },
    }, {
      idempotencyKey: `${userId}-customer`,
    });
    console.log('STRIPE CUSTOMER', customer);
    return customer
  }

  async initMembership(userId) {
    const stripeCustomer = await this.createStripeCustomer(userId);
    const subscription = await this.stripe.subscriptions.create({
      customer: stripeCustomer.id,
      items: [
        { price: this.configService.get<string>('STRIPE_PRICE_ID') },
      ],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
      payment_settings: {
        save_default_payment_method: 'on_subscription',
      },
      metadata: {
        userId: `${userId}`,
        environment: this.environment,
      }
    }, {
      idempotencyKey: `${userId}-subscription`,
    });

    await upsertOne(this.subscriptionModel, {
      user: userId,
      customerId: stripeCustomer.id,
      subscriptionId: subscription.id,
    }, { user: userId });

    const { client_secret, amount, currency, id } = (
      subscription.latest_invoice as Stripe.Invoice
    ).payment_intent as Stripe.PaymentIntent;

    return {
      clientSecret: client_secret,
      amount: amount,
      currency: currency,
      id: id,
    }
  }


  async activateSubscription(subscription) {
    await this.membershipService.setMembership(
      subscription.metadata.userId, {
      "stamps.commenced": new Date(),
    })

    await upsertOne(this.subscriptionModel, {
      "stamps.activatedDate": new Date(),
    }, { user: new mongoose.Types.ObjectId(subscription.metadata.userId) });
  }

  async deActivateSubscription(subscription) {
    await this.membershipService.setMembership(
      subscription.metadata.userId, {
      "stamps.completed": new Date(),
    })

    await upsertOne(this.subscriptionModel, {
      "stamps.deactivatedDate": new Date(),
    }, { user: subscription.metadata.userId });

  }

  async cancelSubscription(userId) {
    const subscription = await filterOne(this.subscriptionModel, { user: userId });
    await this.stripe.subscriptions.cancel(subscription.subscriptionId, {
      idempotencyKey: `${userId}-cancel-subscription`,
    });
    return true;
  }
  async handleSubscriptionChange(subscription) {
    if (subscription.status == 'active') return this.activateSubscription(subscription);
    if (subscription.status == 'canceled') return this.deActivateSubscription(subscription);
  }

  async handleSubscriptionPaymentCreated(payment: Stripe.Invoice) {
    const subscription = await filterOne(this.subscriptionModel, { subscriptionId: payment.subscription });
    await upsertOne(this.subscriptionPaymentModel, {
      externalId: payment.id,
      amount: Number(payment.amount_due) / 100,
      currency: payment.currency,
      subscription: new mongoose.Types.ObjectId(subscription._id),
      status: "pending",
      user: new mongoose.Types.ObjectId(subscription.user),
    }, { user: new mongoose.Types.ObjectId(subscription.user), externalId: payment.id });
  }

  async handleSubscriptionPaymentPaid(payment: Stripe.Invoice) {
    const subscription = await filterOne(this.subscriptionModel, { subscriptionId: payment.subscription });
    await upsertOne(this.subscriptionPaymentModel, {
      externalId: payment.id,
      amount: Number(payment.amount_due) / 100,
      currency: payment.currency,
      subscription: new mongoose.Types.ObjectId(subscription._id),
      status: "paid",
      user: new mongoose.Types.ObjectId(subscription.user),
      paidAt: new Date(payment.created),
    }, { user: new mongoose.Types.ObjectId(subscription.user), externalId: payment.id });
  }

  async handleSubscriptionPaymentFailed(payment: Stripe.Invoice) {
    const subscription = await filterOne(this.subscriptionModel, { subscriptionId: payment.subscription });
    await upsertOne(this.subscriptionPaymentModel, {
      externalId: payment.id,
      amount: payment.amount_due,
      currency: payment.currency,
      subscription: new mongoose.Types.ObjectId(subscription._id),
      status: "failed",
      user: new mongoose.Types.ObjectId(subscription.user),
    }, { user: new mongoose.Types.ObjectId(subscription.user), externalId: payment.id });
  }

  async fetchSubscriptionPayments(subscriptionId: string) {
    const payments = await this.stripe.invoices.list({
      subscription: subscriptionId,
      limit: 20
    });
    return payments;
  }

  async upsertSubscriptionPayments(payments: Stripe.Invoice[], subscriptionId: string) {
    for (const payment of payments) {
      await upsertOne(this.subscriptionPaymentModel, {
        externalId: payment.id,
        amount: payment.amount_due,
        currency: payment.currency,
        status: payment.status === 'paid' ? 'paid' : 'pending',
        subscription: new mongoose.Types.ObjectId(subscriptionId),
        paidAt: new Date(payment.created),
      }, {
        user: new mongoose.Types.ObjectId(payment.metadata.userId),
        externalId: payment.id,
      });
    }
    return true;
  }

  async syncSubscriptionPayments(userId: string) {
    const subscription = await filterOne(this.subscriptionModel, { user: new mongoose.Types.ObjectId(userId) });
    let shouldFetch = true;
    let data = [];
    while (shouldFetch) {
      const result = await this.fetchSubscriptionPayments(subscription.subscriptionId);
      data.push(...result.data);
      if (result.has_more) {
        shouldFetch = true;
      } else {
        shouldFetch = false;
      }
    }
    await this.upsertSubscriptionPayments(data, subscription.subscriptionId);
    return true;
  }


  EVENT_TREE = {
    [SUBSCRIPION_EVENTS.CREATED]: (event) =>
      this.handleSubscriptionChange(event.data.object),
    [SUBSCRIPION_EVENTS.UPDATED]: (event) =>
      this.handleSubscriptionChange(event.data.object),
    [SUBSCRIPION_EVENTS.DELETED]: (event) =>
      this.handleSubscriptionChange(event.data.object),
    [INVOICE_EVENTS.CREATED]: (event) =>
      this.handleSubscriptionPaymentCreated(event.data.object),
    [INVOICE_EVENTS.PAID]: (event) =>
      this.handleSubscriptionPaymentPaid(event.data.object),
    [INVOICE_EVENTS.FAILED]: (event) =>
      this.handleSubscriptionPaymentFailed(event.data.object),
    [PAYMENT_INTENT_EVENTS.NULL]: (event) => {
      console.log(`Unhandled event type ${event?.type}`);
      console.log('*************************************');
      console.log(event?.data);
    },
  };

}
