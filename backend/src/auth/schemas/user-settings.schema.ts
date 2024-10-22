import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type UserSettingsDocument = HydratedDocument<UserSettings>;

@Schema({ timestamps: true })
export class UserSettings {
  @Prop({ required: false, type: mongoose.Schema.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  displayUserGuide: boolean;
}

export const UserSettingsSchema =
  SchemaFactory.createForClass(UserSettings);
