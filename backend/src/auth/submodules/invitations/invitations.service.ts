import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invitation, InvitationDocument } from './schema/invitation.schema';
import { InvitationLink, InvitationLinkDocument } from './schema/invitation-link.schema';
import { InvitedUser, InvitedUserDocument } from './schema/invited-user.schema';
import { InvitationApplication, InvitationApplicationDocument } from './schema/invitation-application.schema';
import { aggregateFeed, connect, create, fetchOne, filter, filterOne, unwind, upsert, upsertOne } from 'src/common/utils/db';
import { ID } from 'src/common/types';
import { InvitationInput, InvitationLinkInput, InvitationApplicationInput } from './invitations.resolver';
import { SessionUserT } from 'src/auth/types/SessionUserType';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class InvitationsService {
  constructor(
    @InjectModel(Invitation.name) private invitationModel: Model<InvitationDocument>,
    @InjectModel(InvitationLink.name) private invitationLinkModel: Model<InvitationLinkDocument>,
    @InjectModel(InvitedUser.name) private invitedUserModel: Model<InvitedUserDocument>,
    @InjectModel(InvitationApplication.name) private invitationApplicationModel: Model<InvitationApplicationDocument>,
    private authService: AuthService,
  ) { }

  async upsertInvitation(user: SessionUserT, input: InvitationInput, id?: ID): Promise<Invitation> {
    return upsertOne(
      this.invitationModel,
      { email: input.email, createdBy: user.id },
      input
    )
  }

  async upsertInvitationLink(user: SessionUserT, input: InvitationLinkInput, id?: ID): Promise<InvitationLink> {
    return upsert(
      this.invitationLinkModel,
      { ...input, createdBy: user.id },
      id,
    )
  }

  invitations(): Promise<Invitation[]> {
    return aggregateFeed(
      this.invitationModel,
      {
        sort: { createdAt: -1 },
      },
      [
        connect('invitedusers', '_id', 'invitation', 'invitedUserDoc'),
        unwind('invitedUserDoc', { preserveNullAndEmptyArrays: true }),
        connect('users', 'invitedUserDoc.user', '_id', 'userDoc'),
        unwind('userDoc', { preserveNullAndEmptyArrays: true }),
        {
          $addFields: {
            user: '$userDoc',
          }
        },
        {
          $project: {
            invitedUserDoc: 0,
            userDoc: 0,
          }
        }
      ]
    )
  }

  invitationLinks(): Promise<InvitationLink[]> {
    return aggregateFeed(
      this.invitationLinkModel,
      {
        sort: { createdAt: -1 },
      },
      [
        connect('invitedusers', '_id', 'invitationLink', 'invitedUserDocs'),
        connect('users', 'invitedUserDocs.user', '_id', 'userDocs', [
          {
            $project: {
              _id: 1,
              email: 1,
              username: 1,
              firstName: 1,
              lastName: 1,
            }
          }
        ]),
        {
          $addFields: {
            users: '$userDocs',
            usersCount: { $size: { $ifNull: ['$userDocs', []] } },
            isValid: {
              $and: [
                // Check if not expired (or no expiration date)
                {
                  $or: [
                    { $eq: ['$expirationDate', null] },
                    { $gt: ['$expirationDate', new Date()] }
                  ]
                },
                // Check if redemption limit not reached
                {
                  $lt: [
                    { $size: { $ifNull: ['$userDocs', []] } },
                    '$redemptionLimit'
                  ]
                }
              ]
            }
          }
        },
        {
          $project: {
            invitedUserDocs: 0,
            userDocs: 0,
            usersCount: 0,
          }
        }
      ]
    )
  }

  async acceptInvitation(email: string | undefined, linkId: string | undefined): Promise<boolean> {
    const user = await this.authService.getUserByEmail(email);
    const payload = { user: user._id, invitationLink: linkId };
    if(!linkId) {
      const invitation = await filterOne(this.invitationModel, { email });
      if (!invitation) return false;
      payload["invitation"] = invitation._id;
    }
    return create(this.invitedUserModel, payload);
  }

  async acceptPersonalInvitation(email: string): Promise<boolean> {
    return true;
  }

  async validatePersonalInvitation(email: string): Promise<boolean> {
    const invitation = await filterOne(this.invitationModel, { email });
    if (!invitation) return false;
    const invitedUser = await filterOne(this.invitedUserModel, { invitation: invitation._id });
    if (invitedUser) return false;
    return true;

  }

  async validateInvitationLink(linkId: string): Promise<boolean> {
    const invitationLink = await fetchOne(this.invitationLinkModel, linkId);
    if (!invitationLink) return false;
    if (invitationLink.redemptionLimit <= 0) return false;
    if (invitationLink.expirationDate && invitationLink.expirationDate < new Date()) return false;
    const invitedUsers = await filter(this.invitedUserModel, { invitationLink: invitationLink._id });
    if (invitedUsers.length >= invitationLink.redemptionLimit) return false;
    return true;
  }

  async validateInvitation(email: string | undefined, linkId: string | undefined): Promise<boolean> {
    if (email) return this.validatePersonalInvitation(email);
    if (linkId) return this.validateInvitationLink(linkId);
    return false;
  }

  invitationApplications(): Promise<InvitationApplication[]> {
    return aggregateFeed(
      this.invitationApplicationModel,
      {
        sort: { createdAt: -1 },
      }
    )
  }

  async stampInvitationApplication(id: ID, key: string): Promise<InvitationApplication> {
    const data = {
      [`stamps.${key}`]: new Date()
    };
    return upsert(
      this.invitationApplicationModel,
      data,
      id
    );
  }

  async createInvitationApplication(input: InvitationApplicationInput): Promise<boolean> {
    try {
      await create(this.invitationApplicationModel, input);
      return true;
    } catch (error) {
      // Handle duplicate email error
      if (error.code === 11000) {
        return false;
      }
      throw error;
    }
  }
}

