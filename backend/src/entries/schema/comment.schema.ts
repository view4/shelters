import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Stamps, StampsSchema } from 'src/common/schemas/stamps.schema';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
@Schema({ timestamps: true })
export class Comment extends Document {
  @Prop({ required: true })
  text: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: MongooseSchema.Types.ObjectId;

  @Prop({ type: StampsSchema })
  stamps: Stamps;
}

export const CommentSchema = SchemaFactory.createForClass(Comment); 