import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Field, ObjectType } from '@nestjs/graphql';

export type InvitationDocument = mongoose.HydratedDocument<Invitation>;

@ObjectType()
@Schema({ timestamps: true })
export class Invitation {
  @Field()
  @Prop({ required: true })
  email: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  invitee: User;

  @Field({ nullable: true })
  @Prop()
  message: string;

  //change to stamps...? 
  @Field({ nullable: true })
  acceptedDate: Date;
}

export const InvitationSchema = SchemaFactory.createForClass(Invitation);

