import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { ObjectType } from '@nestjs/graphql';
import { Stamps, StampsSchema } from 'src/common/schemas/stamps.schema';
import { BoothKind } from './booths.schema.consts';

export type BoothDocument = mongoose.HydratedDocument<Booth>;

@ObjectType()
@Schema({ timestamps: true })
export class Booth {
  @Prop()
  name: string;

  @Prop()
  text: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: StampsSchema })
  stamps: Stamps
}

export const BoothSchema = SchemaFactory.createForClass(Booth);
