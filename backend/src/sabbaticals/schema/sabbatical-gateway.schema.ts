import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ObjectType } from '@nestjs/graphql';
import { Gateway } from 'src/roadmaps/schema/gateway.schema';

export type SabbaticalGatewayDocument = mongoose.HydratedDocument<SabbaticalGateway>;

@ObjectType()
@Schema({ timestamps: true })
export class SabbaticalGateway {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Gateway' })
  gateway: Gateway
}



export const SabbaticalGatewaySchema = SchemaFactory.createForClass(SabbaticalGateway);
