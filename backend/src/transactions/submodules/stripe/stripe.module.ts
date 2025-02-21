import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Subscription, SubscriptionSchema } from './schemas/subscription.schema';

@Module({
  imports: [,
        MongooseModule.forFeature([
          { name: Subscription.name, schema: SubscriptionSchema },
        ]),
    AuthModule
  ],
  controllers: [],
  providers: [StripeService ],
  exports: [StripeService],
})
export class StripeModule {}
