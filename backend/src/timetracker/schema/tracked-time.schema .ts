import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { ObjectType } from '@nestjs/graphql';
import { DedicatedTime } from './dedicated-time.schema';

export type TrackedTimeDocument = mongoose.HydratedDocument<TrackedTime>;

@ObjectType()
@Schema({ timestamps: true })
export class TrackedTime {
  @Prop()
  name: string;

  @Prop()
  text: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  mins: number;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'DedicatedTime'})
  dedicatedTime: DedicatedTime;
}

export const TrackedTimeSchema = SchemaFactory.createForClass(TrackedTime);
