import { Args, Field, InputType, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InvitationsService } from './invitations.service';
import { Invitation } from './schema/invitation.schema';
import { InvitationLink } from './schema/invitation-link.schema';
import { InvitedUser } from './schema/invited-user.schema';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionUser } from 'src/auth/decorators/session-user.decorator';
import { SessionUserT } from 'src/auth/types/SessionUserType';

@InputType()
export class InvitationInput {
  @Field()
  email: string;

  @Field({ nullable: true })
  message?: string;
}

@InputType()
export class InvitationLinkInput {
  @Field(() => Int)
  maxUses: number;

  @Field({ nullable: true })
  expiresAt?: string;

  @Field({ nullable: true })
  description?: string;
}

@Resolver(() => Invitation)
export class InvitationsResolver {
  constructor(private readonly invitationsService: InvitationsService) {}

  // === Invitation Queries ===

  @UseGuards(AuthGuard)
  @Query(() => [Invitation])
  async invitations(
    @SessionUser() user: SessionUserT,
    @Args('status', { type: () => String, nullable: true }) status?: string
  ): Promise<Invitation[]> {
    return this.invitationsService.invitations();
  }

  // @UseGuards(AuthGuard)
  // @Query(() => Invitation)
  // async invitation(
  //   @Args('id', { type: () => String }) id: string
  // ): Promise<Invitation> {
  //   return this.invitationsService.getInvitation(id);
  // }

  // === Invitation Link Queries ===

  // @Query(() => InvitationLink, { nullable: true })
  // async invitationLink(
  //   @Args('code', { type: () => String }) code: string
  // ): Promise<InvitationLink> {
  //   return this.invitationsService.getInvitationLink(code);
  // }

  @UseGuards(AuthGuard)
  @Query(() => [InvitationLink])
  async invitationLinks(
    @SessionUser() user: SessionUserT
  ): Promise<InvitationLink[]> {
    return this.invitationsService.invitationLinks();
  }

  // === Invited User Queries ===

  // @UseGuards(AuthGuard)
  // @Query(() => [InvitedUser])
  // async invitedUsers(
  //   @Args('invitedBy', { type: () => String, nullable: true }) invitedBy?: string
  // ): Promise<InvitedUser[]> {
  //   return this.invitationsService.getInvitedUsers(invitedBy);
  // }

  // @UseGuards(AuthGuard)
  // @Query(() => [InvitedUser])
  // async myInvitees(
  //   @SessionUser() user: SessionUserT
  // ): Promise<InvitedUser[]> {
  //   return this.invitationsService.getInvitedUsers(user?.id);
  // }

  // // === Invitation Mutations ===

  // @UseGuards(AuthGuard)
  // @Mutation(() => Invitation)
  // async createInvitation(
  //   @SessionUser() user: SessionUserT,
  //   @Args('input') input: InvitationInput
  // ): Promise<Invitation> {
  //   return this.invitationsService.createInvitation(
  //     user?.id,
  //     input.email,
  //     input.message
  //   );
  // }

  // @UseGuards(AuthGuard)
  // @Mutation(() => Invitation)
  // async updateInvitationStatus(
  //   @Args('id', { type: () => String }) id: string,
  //   @Args('status', { type: () => String }) status: string
  // ): Promise<Invitation> {
  //   return this.invitationsService.updateInvitationStatus(id, status);
  // }

  // // === Invitation Link Mutations ===

  // @UseGuards(AuthGuard)
  // @Mutation(() => InvitationLink)
  // async createInvitationLink(
  //   @SessionUser() user: SessionUserT,
  //   @Args('input') input: InvitationLinkInput
  // ): Promise<InvitationLink> {
  //   const expiresAt = input.expiresAt ? new Date(input.expiresAt) : undefined;
    
  //   return this.invitationsService.createInvitationLink(
  //     user?.id,
  //     input.maxUses,
  //     expiresAt,
  //     input.description
  //   );
  // }

  // @UseGuards(AuthGuard)
  // @Mutation(() => InvitationLink)
  // async disableInvitationLink(
  //   @Args('code', { type: () => String }) code: string
  // ): Promise<InvitationLink> {
  //   return this.invitationsService.disableInvitationLink(code);
  // }

  // // === Accept Invitation Mutation ===

  // @UseGuards(AuthGuard)
  // @Mutation(() => InvitedUser)
  // async acceptInvitation(
  //   @SessionUser() user: SessionUserT,
  //   @Args('invitationId', { type: () => String, nullable: true }) invitationId?: string,
  //   @Args('invitationCode', { type: () => String, nullable: true }) invitationCode?: string
  // ): Promise<InvitedUser> {
  //   return this.invitationsService.acceptInvitation(
  //     user?.id,
  //     user?.email,
  //     invitationId,
  //     invitationCode
  //   );
  // }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async acceptInvitation(
    @SessionUser() user: SessionUserT
  ): Promise<boolean> {
    return this.invitationsService.acceptInvitation(user?.id);
  }
}

