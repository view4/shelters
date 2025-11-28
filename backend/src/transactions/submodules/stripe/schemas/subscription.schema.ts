import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

export type SubscriptionDocument = HydratedDocument<Subscription>;

@Schema({ timestamps: true })
export class Subscription {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User

  @Prop({})
  customerId: string;

  @Prop({})
  subscriptionId: string;

  @Prop({
    type: {
      activatedDate: Date,
      deactivatedDate: Date
    }
  })
  
  stamps: {
    activatedDate: Date;
    deactivatedDate: Date;
  }
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
