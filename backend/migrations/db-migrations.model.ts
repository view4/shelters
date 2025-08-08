import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType } from '@nestjs/graphql';
import { HydratedDocument } from 'mongoose';

export type DbMigrationDocument = HydratedDocument<DBMigration>;

@ObjectType()
@Schema({ timestamps: true })
export class DBMigration {
  @Prop({ required: true })
  migrationName: string;

  @Prop({ required: true })
  startedAt: Date;

  @Prop()
  finishedAt: Date;

  @Prop({ 
    required: true,
    enum: ['pending', 'success', 'failed'],
    default: 'pending'
  })
  status: string;

  @Prop()
  message: string;
}

export const DbMigrationSchema = SchemaFactory.createForClass(DBMigration);
