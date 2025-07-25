import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Comment, CommentSchema } from 'src/entries/schema/comment.schema';

@Schema({ timestamps: true })
export class FeatureComment extends Comment {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Feature', required: true })
  feature: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Comment', required: true })
  comment: MongooseSchema.Types.ObjectId;
}

export const FeatureCommentSchema = SchemaFactory.createForClass(FeatureComment);
