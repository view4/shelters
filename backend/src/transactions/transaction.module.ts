import { forwardRef, Module } from '@nestjs/common';
import { BoothsModule } from 'src/booths/booths.module';
import { TransactionResolver } from './transaction.resolver';
import { TransactionService } from './transaction.service';
import { StripeModule } from './submodules/stripe/stripe.module';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Subscription, SubscriptionSchema } from './submodules/stripe/schemas/subscription.schema';
import { SubscriptionPayment, SubscriptionPaymentSchema } from './submodules/stripe/schemas/subscription-payment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subscription.name, schema: SubscriptionSchema },
      { name: SubscriptionPayment.name, schema: SubscriptionPaymentSchema },
    ]),
    forwardRef(() => StripeModule),
    forwardRef(() => BoothsModule),
    AuthModule
  ],
  controllers: [],
  providers: [TransactionResolver, TransactionService],
  exports: [TransactionService],
})
export class TransactionModule { }
