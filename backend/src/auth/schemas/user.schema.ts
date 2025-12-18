import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User> & {
  createdAt?: Date;
  updatedAt?: Date;
};

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true, required:  true })
  authenticatorId: string;

  @Prop({})
  email: string;

  @Prop({ default: [] })
  roles: Array<string>;

  @Prop({ required: false })
  authenticatorProviderKey: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
