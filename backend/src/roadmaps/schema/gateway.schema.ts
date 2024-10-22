import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { ObjectType } from '@nestjs/graphql';
import { Booth } from 'src/booths/schema/booth.schema';

export type GatewayDocument = mongoose.HydratedDocument<Gateway>;

@ObjectType()
@Schema({ timestamps: true })
export class Gateway {
    @Prop()
    name: string;

    @Prop()
    text: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Gateway' })
    parent: Gateway;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Booth' })
    booth: Booth

    @Prop({
        type: {
            commenced: Date,
            completed: Date
        }
    })
    stamps: Record<string, Date>
}

export const GatewaySchema = SchemaFactory.createForClass(Gateway);
