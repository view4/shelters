import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { Stamps, StampsSchema } from 'src/common/schemas/stamps.schema';

export type MembershipDocument = HydratedDocument<Membership>;

@Schema({ timestamps: true })
export class Membership {
  @Prop({ unique: true, required:  true })
  user: User 


  @Prop({ type: StampsSchema })
  stamps: Stamps
}

export const MembershipSchema = SchemaFactory.createForClass(Membership);
