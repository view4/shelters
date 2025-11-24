import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invitation, InvitationDocument } from './schema/invitation.schema';
import { InvitationLink, InvitationLinkDocument } from './schema/invitation-link.schema';
import { InvitedUser, InvitedUserDocument } from './schema/invited-user.schema';
import { aggregateFeed,  upsert, upsertOne } from 'src/common/utils/db';
import { ID } from 'src/common/types';
import { InvitationInput, InvitationLinkInput } from './invitations.resolver';

@Injectable()
export class InvitationsService {
  constructor(
    @InjectModel(Invitation.name) private invitationModel: Model<InvitationDocument>,
    @InjectModel(InvitationLink.name) private invitationLinkModel: Model<InvitationLinkDocument>,
    @InjectModel(InvitedUser.name) private invitedUserModel: Model<InvitedUserDocument>,
  ) {}

  async upsertInvitation(input: InvitationInput): Promise<Invitation> {
    return upsertOne(
      this.invitationModel,
      { email: input.email },
      input
    )
  }

  async upsertInvitationLink(input: InvitationLinkInput, id?: ID): Promise<InvitationLink> {
    return upsert(
      this.invitationLinkModel,
      input,
      id,
    )
  }

  invitations(): Promise<Invitation[]> {
    return aggregateFeed(
      this.invitationModel,
      {
        sort: { createdAt: -1 },
      }
    )
  }

  invitationLinks(): Promise<InvitationLink[]> {
    return aggregateFeed(
      this.invitationLinkModel,
      {
        sort: { createdAt: -1 },
      }
    )
  }

  async acceptInvitation(userId: string): Promise<boolean> {
    return true;
  }
}

