import { Injectable } from '@nestjs/common';
import { StripeService } from './submodules/stripe/stripe.service';

@Injectable()
export class TransactionService {
  constructor(
    private stripeService: StripeService
  ) {
  }

  async initMembership (userId: string) {
    return this.stripeService.initMembership(userId);
  }

  async cancelMembership (userId: string) {
    return this.stripeService.cancelSubscription(userId);
  }


}
