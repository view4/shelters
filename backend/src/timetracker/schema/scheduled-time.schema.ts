import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { ObjectType } from '@nestjs/graphql';
import { Booth } from 'src/booths/schema/booth.schema';

export type ScheduledTimeDocument = mongoose.HydratedDocument<ScheduledTime>;

@ObjectType()
@Schema({ timestamps: true })
export class ScheduledTime {
  @Prop()
  name: string;

  @Prop()
  text: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  start: Date;

  @Prop()
  end: Date;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Booth'})
  booth: Booth
}

export const ScheduledTimeSchema = SchemaFactory.createForClass(ScheduledTime);
