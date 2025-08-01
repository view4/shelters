import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ObjectType } from '@nestjs/graphql';
import { Booth } from 'src/booths/schema/booth.schema';
import { DedicatedTime } from './dedicated-time.schema';

export type BoothDedicatedTimeDocument = mongoose.HydratedDocument<BoothDedicatedTime>;

@ObjectType()
@Schema({ timestamps: true })
export class BoothDedicatedTime {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Booth', required: true })
  booth: Booth;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'DedicatedTime', required: true })
  dedicatedTime: DedicatedTime;
}

export const BoothDedicatedTimeSchema = SchemaFactory.createForClass(BoothDedicatedTime);

// Create compound index for efficient queries
BoothDedicatedTimeSchema.index({ booth: 1, dedicatedTime: 1 }, { unique: true });
BoothDedicatedTimeSchema.index({ booth: 1 });
BoothDedicatedTimeSchema.index({ dedicatedTime: 1 });