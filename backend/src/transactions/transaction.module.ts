import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { FirebaseModule } from './submodules/firebase/firebase.module';
import { Membership, MembershipSchema } from './schemas/membership.schema';
import { BoothsModule } from 'src/booths/booths.module';
import { TransactionResolver } from './transaction.resolver';
import { TransactionService } from './transaction.service';
import { StripeModule } from './submodules/stripe/stripe.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Membership.name, schema: MembershipSchema }
    ]),
    FirebaseModule,
    StripeModule,
    forwardRef(() => BoothsModule),


  ],
  controllers: [],
  providers: [TransactionResolver, TransactionService],
  exports: [],
})
export class TransactionModule { }
