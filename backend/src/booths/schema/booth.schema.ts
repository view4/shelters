import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { ObjectType } from '@nestjs/graphql';

export type BoothDocument = mongoose.HydratedDocument<Booth>;

@ObjectType()
@Schema({ timestamps: true })
export class Booth {
  @Prop()
  name: string;

  @Prop()
  text: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const BoothSchema = SchemaFactory.createForClass(Booth);
