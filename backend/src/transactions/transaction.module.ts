import { forwardRef, Module } from '@nestjs/common';
import { BoothsModule } from 'src/booths/booths.module';
import { TransactionResolver } from './transaction.resolver';
import { TransactionService } from './transaction.service';
import { StripeModule } from './submodules/stripe/stripe.module';

@Module({
  imports: [
    StripeModule,
    forwardRef(() => BoothsModule),
  ],
  controllers: [],
  providers: [TransactionResolver, TransactionService],
  exports: [],
})
export class TransactionModule { }
