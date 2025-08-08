import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class FeatureVote extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Feature', required: true })
  feature: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vote', required: true })
  vote: MongooseSchema.Types.ObjectId;
}

export const FeatureVoteSchema = SchemaFactory.createForClass(FeatureVote); 