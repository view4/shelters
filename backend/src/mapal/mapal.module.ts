import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MapalService } from './mapal.service';
import { MapalResolver } from './mapal.resolver';
import { Feature, FeatureSchema } from './schema/feature.schema';
import { FeatureVote, FeatureVoteSchema } from './schema/feature-vote.schema';
import { FeatureComment, FeatureCommentSchema } from './schema/feature-comment.schema';
import { MapalBooth, MapalBoothSchema } from './schema/mapal-booth.schema';
import { BoothsModule } from 'src/booths/booths.module';
import { AuthModule } from 'src/auth/auth.module';
import { EntriesModule } from 'src/entries/entries.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Feature.name, schema: FeatureSchema },
      { name: FeatureVote.name, schema: FeatureVoteSchema },
      { name: FeatureComment.name, schema: FeatureCommentSchema },
      { name: MapalBooth.name, schema: MapalBoothSchema },
    ]),
    BoothsModule,
    forwardRef(() => AuthModule),
    EntriesModule,
  ],
  providers: [MapalService, MapalResolver],
  exports: [MapalService],
})
export class MapalModule { } 