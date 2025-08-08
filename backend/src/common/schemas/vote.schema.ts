import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Stamps, StampsSchema } from './stamps.schema';

@Schema({ timestamps: true })
export class Vote extends Document {
    @Prop({ required: false })
    text: string;

    @Prop({ required: false })
    score: number;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    user: MongooseSchema.Types.ObjectId;

    @Prop({ type: StampsSchema })
    stamps: Stamps;
}

export const VoteSchema = SchemaFactory.createForClass(Vote);