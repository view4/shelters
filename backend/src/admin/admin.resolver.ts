import { Args, Field, InputType, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionUser } from 'src/auth/decorators/session-user.decorator';
import { SessionUserT } from 'src/auth/types/SessionUserType';
import { AdminService } from './admin.service';
import { TransactionService } from 'src/transactions/transaction.service';
import { InvitationsService } from 'src/auth/submodules/invitations/invitations.service';

@InputType()
export class InvitationInput {
  @Field()
  email: string;

  @Field({ nullable: true })
  message?: string;
}

@InputType()
export class InvitationLinkInput {
  @Field(() => Number)
  redemptionLimit: number;
  @Field(() => Date, { nullable: true })
  expirationDate?: Date;
  @Field(() => String, { nullable: true })
  description?: string;
}

@InputType()
export class UserInput {
  @Field()
  email: string;
}

@Resolver('Admin')
export class AdminResolver {
  constructor(
    private service: AdminService,
    private invitationsService: InvitationsService,
    private transactionsService: TransactionService
  ) { }

  @Query()
  @UseGuards(AuthGuard)
  async users(
    @SessionUser() user: SessionUserT
  ) {
    return this.service.users()
  }

  @Query()
  @UseGuards(AuthGuard)
  async subscriptions(
    @SessionUser() user: SessionUserT,
  ) {
    return this.transactionsService.subscriptions(user.id, { includeIsActive: true })
  }

  @Query()
  @UseGuards(AuthGuard)
  async invitations(
    @SessionUser() user: SessionUserT
  ) {
    return this.invitationsService.invitations()
  }

  @Query()
  @UseGuards(AuthGuard)
  async invitationLinks(
    @SessionUser() user: SessionUserT
  ) {
    return this.invitationsService.invitationLinks()
  }

  @Query()
  @UseGuards(AuthGuard)
  async invitationApplications(
    @SessionUser() user: SessionUserT
  ) {
    return this.invitationsService.invitationApplications()
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async upsertInvitation(
    @SessionUser() user: SessionUserT,
    @Args('input') input: InvitationInput,
    @Args('id', { nullable: true }) id?: string
  ) {
    return this.invitationsService.upsertInvitation(user, input, id)
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async upsertInvitationLink(
    @SessionUser() user: SessionUserT,
    @Args('input') input: InvitationLinkInput,
    @Args('id', { nullable: true }) id?: string
  ) {
    return this.invitationsService.upsertInvitationLink(user, input, id)
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async stampInvitationApplication(
    @SessionUser() user: SessionUserT,
    @Args('id') id: string,
    @Args('key') key: string
  ) {
    return this.invitationsService.stampInvitationApplication(id, key)
  }
}
