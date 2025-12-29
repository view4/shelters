/*
> add model 
 > add logic for creating, handling subscription payments

*/

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Subscription } from './subscription.schema';

export type SubscriptionPaymentDocument = HydratedDocument<SubscriptionPayment>;

@Schema({ timestamps: true })
export class SubscriptionPayment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User

  @Prop({ required: true, unique: true })
  externalId: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' })
  subscription: Subscription;

  @Prop({ required: true })
  paidAt: Date;

  @Prop({ required: true, enum: ["pending", "paid", "failed"] })
  status: "pending" | "paid" | "failed";

  @Prop({ required: false })
  receiptUrl: string;
}

export const SubscriptionPaymentSchema = SchemaFactory.createForClass(SubscriptionPayment);