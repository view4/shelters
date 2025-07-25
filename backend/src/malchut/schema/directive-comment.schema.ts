import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Comment } from 'src/entries/schema/comment.schema';

@Schema({ timestamps: true })
export class DirectiveComment extends Comment {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Directive', required: true })
  directive: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Comment', required: true })
  comment: MongooseSchema.Types.ObjectId;
}

export const DirectiveCommentSchema = SchemaFactory.createForClass(DirectiveComment); 