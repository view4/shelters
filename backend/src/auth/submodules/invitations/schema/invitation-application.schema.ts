import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Stamps, StampsSchema } from 'src/common/schemas/stamps.schema';

export type InvitationApplicationDocument = mongoose.HydratedDocument<InvitationApplication>;

@ObjectType()
@Schema({ timestamps: true })
export class InvitationApplication {
  @Field()
  @Prop({ required: true, unique: true })
  email: string;

  @Field({ nullable: true })
  @Prop()
  name?: string;

  @Field({ nullable: true })
  @Prop()
  text?: string;

  @Field(() => Stamps, { nullable: true })
  @Prop({ type: StampsSchema })
  stamps?: Stamps;
}

export const InvitationApplicationSchema = SchemaFactory.createForClass(InvitationApplication);

// Create unique index on email
InvitationApplicationSchema.index({ email: 1 }, { unique: true });

