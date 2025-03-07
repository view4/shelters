import { forwardRef, Module } from '@nestjs/common';
import { BoothsModule } from 'src/booths/booths.module';
import { TransactionResolver } from './transaction.resolver';
import { TransactionService } from './transaction.service';
import { StripeModule } from './submodules/stripe/stripe.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    forwardRef(() => StripeModule),
    forwardRef(() => BoothsModule),
    AuthModule
  ],
  controllers: [],
  providers: [TransactionResolver, TransactionService],
  exports: [],
})
export class TransactionModule { }
