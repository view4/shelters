import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Field, ObjectType, Int } from '@nestjs/graphql';

export type InvitationLinkDocument = mongoose.HydratedDocument<InvitationLink>;

@ObjectType()
@Schema({ timestamps: true })
export class InvitationLink {
  @Field(() => String, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: User;

  @Field(() => Int)
  @Prop({ required: true })
  redemptionLimit: number;

  @Field({ nullable: true })
  @Prop()
  expirationDate: Date;

  @Field({ nullable: true })
  @Prop()
  description: string;
}

export const InvitationLinkSchema = SchemaFactory.createForClass(InvitationLink);

