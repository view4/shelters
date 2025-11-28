import { Injectable } from '@nestjs/common';
import { StripeService } from './submodules/stripe/stripe.service';
import { Subscription } from './submodules/stripe/schemas/subscription.schema';
import { SubscriptionPayment } from './submodules/stripe/schemas/subscription-payment.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { aggregateFeed, connect } from 'src/common/utils/db';

@Injectable()
export class TransactionService {
  constructor(
    private stripeService: StripeService,
    @InjectModel(Subscription.name) private subscriptionModel: Model<Subscription>,
    @InjectModel(SubscriptionPayment.name) private subscriptionPaymentModel: Model<SubscriptionPayment>,
  ) {
  }

  async initMembership (userId: string) {
    return this.stripeService.initMembership(userId);
  }

  async cancelMembership (userId: string) {
    return this.stripeService.cancelSubscription(userId);
  }

  async subscriptions(userId: string, { includeIsActive = false } = {}) {
    return aggregateFeed(
      this.subscriptionModel,
      {
        sort: { createdAt: -1 },
      },
      [
        connect('users', 'user', '_id', 'user'),
        {
          $addFields: {
            user: { $arrayElemAt: ['$user', 0] },
          },
        }
      ],
    )
  }

  async subscriptionPayments(userId: string) {
    return aggregateFeed(
      this.subscriptionPaymentModel,
      {
        sort: { createdAt: -1 },
      },
    
      [
        connect('users', 'user', '_id', 'user'),
        connect('subscriptions', 'subscription', '_id', 'subscription'),
        {
          $addFields: {
            user: { $arrayElemAt: ['$user', 0] },
            subscription: { $arrayElemAt: ['$subscription', 0] },
          },
        }
      ],
    )
  }
}
