import { Args, Field, InputType, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InvitationsService } from './invitations.service';
import { Invitation } from './schema/invitation.schema';
import { InvitationLink } from './schema/invitation-link.schema';
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
  redemptionLimit: number;

  @Field({ nullable: true })
  expirationDate?: Date;

  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class InvitationApplicationInput {
  @Field()
  email: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  text?: string;
}

@Resolver(() => Invitation)
export class InvitationsResolver {
  constructor(private readonly invitationsService: InvitationsService) {}


  // @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async acceptInvitation(
    @Args('email') email: string,
    @Args('linkId', { nullable: true }) linkId?: string
  ): Promise<boolean> {
    return this.invitationsService.acceptInvitation(email, linkId);
  }

  @Query(() => Boolean)
  async validateInvitation(
    @Args('email', { nullable: true }) email?: string,
    @Args('linkId', { nullable: true }) linkId?: string
  ): Promise<boolean> {
    return this.invitationsService.validateInvitation(email, linkId);
  }

  @Mutation(() => Boolean)
  async upsertInviteApplication(
    @Args('input') input: InvitationApplicationInput
  ): Promise<boolean> {
    return this.invitationsService.upsertInviteApplication(input);
  }

}

