import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonResolver } from './common.resolver';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [
    MongooseModule.forFeature([
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
