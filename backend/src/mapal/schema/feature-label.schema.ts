import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
@Schema({ timestamps: true })
export class FeatureLabel extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Feature', required: true })
  feature: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Label', required: true })
  label: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: MongooseSchema.Types.ObjectId;
}

export const FeatureLabelSchema = SchemaFactory.createForClass(FeatureLabel); 