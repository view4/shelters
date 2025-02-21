import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true, required:  true })
  authenticatorId: string;

  @Prop({})
  email: string;

  @Prop({ default: [] })
  roles: Array<string>;
}

export const UserSchema = SchemaFactory.createForClass(User);
