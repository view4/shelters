import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type UserInformationDocument = HydratedDocument<UserInformation>;

@Schema({ timestamps: true })
export class UserInformation {
  @Prop({ required: false, type: mongoose.Schema.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  bio: string;

  @Prop()
  photo: string;
}

export const UserInformationSchema =
  SchemaFactory.createForClass(UserInformation);
