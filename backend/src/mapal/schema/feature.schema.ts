import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Stamps, StampsSchema } from 'src/common/schemas/stamps.schema';

@Schema({ timestamps: true })
export class Feature extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  text: string;

  @Prop({ type: StampsSchema })
  stamps: Stamps

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Booth', required: true })
  booth: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Feature' })
  parent: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: MongooseSchema.Types.ObjectId;
}

export const FeatureSchema = SchemaFactory.createForClass(Feature); 