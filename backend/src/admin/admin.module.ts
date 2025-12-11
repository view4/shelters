import { forwardRef, Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/auth/schemas/user.schema';
import { AdminResolver } from './admin.resolver';
import { AuthModule } from 'src/auth/auth.module';
import { InvitationsModule } from 'src/auth/submodules/invitations/invitations.module';
import { TransactionModule } from 'src/transactions/transaction.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),
    forwardRef(() => AuthModule),
    forwardRef(() => InvitationsModule),
    forwardRef(() => TransactionModule),
  ],
  providers: [AdminService, AdminResolver],
  exports: [AdminService],
})
export class AdminModule { }

