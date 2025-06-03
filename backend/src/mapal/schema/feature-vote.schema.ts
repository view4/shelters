import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Stamps, StampsSchema } from 'src/common/schemas/stamps.schema';

@Schema({ timestamps: true })
export class FeatureVote extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Feature', required: true })
  feature: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  score: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: MongooseSchema.Types.ObjectId;

  @Prop({ type: StampsSchema })
  stamps: Stamps
}

export const FeatureVoteSchema = SchemaFactory.createForClass(FeatureVote); 