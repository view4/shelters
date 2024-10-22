import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { ObjectType } from '@nestjs/graphql';
import { Booth } from 'src/booths/schema/booth.schema';

export type DedicatedTimeDocument = mongoose.HydratedDocument<DedicatedTime>;

@ObjectType()
@Schema({ timestamps: true })
export class DedicatedTime {
  @Prop()
  name: string;

  @Prop()
  text: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  mins: number;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'DedicatedTime'})
  parent: DedicatedTime;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Booth'})
  booth: Booth
}

export const DedicatedTimeSchema = SchemaFactory.createForClass(DedicatedTime);
