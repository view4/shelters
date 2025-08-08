import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ObjectType } from '@nestjs/graphql';
import { TrackedTime } from './tracked-time.schema ';
import { DedicatedTime } from './dedicated-time.schema';

export type TrackedDedicatedTimeDocument = mongoose.HydratedDocument<TrackedDedicatedTime>;

@ObjectType()
@Schema({ timestamps: true })
export class TrackedDedicatedTime {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'TrackedTime', required: true })
  trackedTime: TrackedTime;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'DedicatedTime', required: true })
  dedicatedTime: DedicatedTime;
}

export const TrackedDedicatedTimeSchema = SchemaFactory.createForClass(TrackedDedicatedTime);

// Create compound index for efficient queries
TrackedDedicatedTimeSchema.index({ trackedTime: 1, dedicatedTime: 1 }, { unique: true });
TrackedDedicatedTimeSchema.index({ trackedTime: 1 });
TrackedDedicatedTimeSchema.index({ dedicatedTime: 1 });