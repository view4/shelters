import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class DirectiveVote extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Directive', required: true })
  directive: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Vote', required: true })
  vote: MongooseSchema.Types.ObjectId;
}

export const DirectiveVoteSchema = SchemaFactory.createForClass(DirectiveVote);