import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ObjectType } from '@nestjs/graphql';
import { Stamps, StampsSchema } from './stamps.schema';

export type LabelDocument = mongoose.HydratedDocument<Label>;

@ObjectType()
@Schema({ timestamps: true })
export class Label {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: mongoose.Types.ObjectId;

  @Prop({ type: StampsSchema })
  stamps: Stamps;
}

export const LabelSchema = SchemaFactory.createForClass(Label); 