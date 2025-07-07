import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MapalService } from './mapal.service';
import { MapalResolver } from './mapal.resolver';
import { Feature, FeatureSchema } from './schema/feature.schema';
import { FeatureVote, FeatureVoteSchema } from './schema/feature-vote.schema';
import { FeatureComment, FeatureCommentSchema } from './schema/feature-comment.schema';
import { MapalBooth, MapalBoothSchema } from './schema/mapal-booth.schema';
import { FeatureLabel, FeatureLabelSchema } from './schema/feature-label.schema';
import { BoothsModule } from 'src/booths/booths.module';
import { AuthModule } from 'src/auth/auth.module';
import { EntriesModule } from 'src/entries/entries.module';
import { CommonModule } from 'src/common/common.module';
import { Label, LabelSchema } from 'src/common/schemas/label.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Feature.name, schema: FeatureSchema },
      { name: FeatureVote.name, schema: FeatureVoteSchema },
      { name: FeatureComment.name, schema: FeatureCommentSchema },
      { name: MapalBooth.name, schema: MapalBoothSchema },
      { name: FeatureLabel.name, schema: FeatureLabelSchema },
      { name: Label.name, schema: LabelSchema },
    ]),
    BoothsModule,
    forwardRef(() => AuthModule),
    EntriesModule,
    CommonModule,

  ],
  providers: [MapalService, MapalResolver],
  exports: [MapalService],
})
export class MapalModule { } 