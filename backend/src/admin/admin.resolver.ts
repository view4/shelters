import { Args, Field, InputType, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionUser } from 'src/auth/decorators/session-user.decorator';
import { SessionUserT } from 'src/auth/types/SessionUserType';
import { AdminService } from './admin.service';
import { TransactionService } from 'src/transactions/transaction.service';
import { InvitationsService } from 'src/auth/submodules/invitations/invitations.service';
/*
should each route be prefaced because of being admin?

*/

@InputType()
export class InvitationInput {
  @Field()
  email: string;

  @Field({ nullable: true })
  message?: string;
}

@InputType()
export class InvitationLinkInput {
  @Field()
  code: string;
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

  @Mutation()
  @UseGuards(AuthGuard)
  async upsertInvitation(
    @SessionUser() user: SessionUserT,
    @Args('input') input: InvitationInput
  ) {
    return this.invitationsService.upsertInvitation(input)
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async upsertInvitationLink(
    @SessionUser() user: SessionUserT,
    @Args('input') input: InvitationLinkInput
  ) {
    return this.invitationsService.upsertInvitationLink(input)
  }
}
