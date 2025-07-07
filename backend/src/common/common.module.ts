import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonResolver } from './common.resolver';
import { HttpModule } from '@nestjs/axios';
import { Label, LabelSchema } from './schemas/label.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Label.name, schema: LabelSchema }
    ]),
    HttpModule
  ],
  controllers: [],
  exports: [
  ],
  providers: [
    CommonResolver,
  ],
})
export class CommonModule { }
