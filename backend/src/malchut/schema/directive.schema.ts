import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { DirectiveStamps, DirectiveStampsSchema } from './Directive-stamps.schema';
import { Stamps, StampsSchema } from 'src/common/schemas/stamps.schema';

@Schema({ timestamps: true })
export class Directive extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  text: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Booth', required: true })
  booth: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Directive' })
  parent: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: MongooseSchema.Types.ObjectId;

  @Prop({ type: StampsSchema })
  stamps: Stamps;
}

export const DirectiveSchema = SchemaFactory.createForClass(Directive); 