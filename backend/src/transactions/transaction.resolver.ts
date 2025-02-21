import { Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { SessionUser } from './decorators/session-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { TransactionService } from './transaction.service';

@Resolver('User')
export class TransactionResolver {
  constructor(
    private service: TransactionService,
  ) { }

  @Mutation()
  @UseGuards(AuthGuard)
  async initMembership(
    @SessionUser() user
  ){
    return this.service.initMembership(user.id);
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async cancelMembership(
    @SessionUser() user
  ){
    return this.service.cancelMembership(user.id);
  }

}
