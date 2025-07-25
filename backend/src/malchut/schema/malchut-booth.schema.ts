import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Stamps, StampsSchema } from 'src/common/schemas/stamps.schema';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
@Schema({ timestamps: true })
export class MalchutBooth extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Booth', required: true })
  booth: MongooseSchema.Types.ObjectId;

  @Prop({ type: StampsSchema })
  stamps: Stamps;
}

export const MalchutBoothSchema = SchemaFactory.createForClass(MalchutBooth); 