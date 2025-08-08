import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonResolver } from './common.resolver';
import { HttpModule } from '@nestjs/axios';
import { Label, LabelSchema } from './schemas/label.schema';
import { Vote, VoteSchema } from './schemas/vote.schema';
import { VoteService } from './vote.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Label.name, schema: LabelSchema },
      { name: Vote.name, schema: VoteSchema }
    ]),
    HttpModule
  ],
  controllers: [],
  exports: [
    VoteService,
  ],
  providers: [
    CommonResolver,
    VoteService,
  ],
})
export class CommonModule { }
