import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { ObjectType } from '@nestjs/graphql';
import { Booth } from 'src/booths/schema/booth.schema';
import { Stamps, StampsSchema } from 'src/common/schemas/stamps.schema';

export type RoadmapDocument = mongoose.HydratedDocument<Roadmap>;


@ObjectType()
@Schema({ timestamps: true })
export class Roadmap {
    @Prop()
    name: string;

    @Prop()
    text: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Roadmap' })
    parent: Roadmap;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Booth' })
    booth: Booth

    @Prop({type: StampsSchema})
    stamps: Stamps
}

export const RoadmapSchema = SchemaFactory.createForClass(Roadmap);
