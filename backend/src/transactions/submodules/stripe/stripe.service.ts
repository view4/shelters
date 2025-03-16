import { Injectable } from '@nestjs/common';
import { PAYMENT_INTENT_EVENTS, SUBSCRIPION_EVENTS } from './stripe.const';
import Stripe from 'stripe';
import { AuthService } from 'src/auth/auth.service';
import { ConfigService } from '@nestjs/config';
import { MembershipService } from 'src/auth/membership.service';
import { InjectModel } from '@nestjs/mongoose';
import { Subscription } from './schemas/subscription.schema';
import { create, filterOne, upsertOne } from 'src/common/utils/db';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class StripeService {
  stripe: Stripe;
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private membershipService: MembershipService,
    @InjectModel(Subscription.name) private subscriptionModel: Model<Subscription>,

  ) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY'),
    );
  }


  async handleEvent(event: Record<string, string>) {

    const handler =
      this.EVENT_TREE[event.type] ||
      this.EVENT_TREE[PAYMENT_INTENT_EVENTS.NULL];
    return handler(event);
  }

  async createStripeCustomer(userId) {
    const user = await this.authService.getUser(userId);
    const customer = await this.stripe.customers.create({
      email: user.email,
      name: "User Name Here",
      metadata: {
        userId: `${userId}`,
      },
    }, {
      idempotencyKey: `${userId}-customer`,
    });
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



  EVENT_TREE = {
    [SUBSCRIPION_EVENTS.CREATED]: (event) =>
      this.handleSubscriptionChange(event.data.object),
    [SUBSCRIPION_EVENTS.UPDATED]: (event) =>
      this.handleSubscriptionChange(event.data.object),
    [SUBSCRIPION_EVENTS.DELETED]: (event) =>
      this.handleSubscriptionChange(event.data.object),
    [PAYMENT_INTENT_EVENTS.NULL]: (event) => {
      console.log(`Unhandled event type ${event.type}`);
      console.log('*************************************');
      console.log(event.data);
    },
  };

}
