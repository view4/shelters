import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { ObjectType } from '@nestjs/graphql';
import { Booth } from 'src/booths/schema/booth.schema';
import { Gateway } from 'src/roadmaps/schema/gateway.schema';
import { SabbaticalGateway } from 'src/sabbaticals/schema/sabbatical-gateway.schema';

export type CycleDocument = mongoose.HydratedDocument<Cycle>;

@ObjectType()
@Schema({ timestamps: true })
export class Cycle {
  @Prop()
  name: string;

  @Prop()
  text: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Cycle' })
  parent: Cycle;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Booth' })
  booth: Booth

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Gateway' })
  a: Gateway

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Gateway' })
  b: Gateway

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Gateway' })
  c: Gateway

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Gateway' })
  d: Gateway

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Gateway' })
  e: Gateway

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Gateway' })
  f: Gateway

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SabbaticalGateway' })
  sabbatical: SabbaticalGateway

  @Prop()
  completed: Date
}

export const CycleSchema = SchemaFactory.createForClass(Cycle);
