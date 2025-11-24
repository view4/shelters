import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Invitation } from './invitation.schema';
import { InvitationLink } from './invitation-link.schema';
import { Field, ObjectType } from '@nestjs/graphql';

export type InvitedUserDocument = mongoose.HydratedDocument<InvitedUser>;

@ObjectType()
@Schema({ timestamps: true })
export class InvitedUser {
  @Field(() => String)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Field(() => String, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Invitation' })
  invitation: Invitation;

  @Field(() => String, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'InvitationLink' })
  invitationLink: InvitationLink;
}

export const InvitedUserSchema = SchemaFactory.createForClass(InvitedUser);

// Create compound index for efficient queries
InvitedUserSchema.index({ invitation: 1 });
InvitedUserSchema.index({ invitationLink: 1 });

