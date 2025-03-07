import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

export type SubscriptionDocument = HydratedDocument<Subscription>;

@Schema({ timestamps: true })
export class Subscription {
  @Prop({ unique: true, required:  true })
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
