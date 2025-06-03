import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feature } from './schema/feature.schema';
import { FeatureVote } from './schema/feature-vote.schema';
import { FeatureComment } from './schema/feature-comment.schema';
import { MapalBooth } from './schema/mapal-booth.schema';
import { aggregate, aggregateFeed, fetchOne, filter, filterOne, upsert } from 'src/common/utils/db';
import { ID } from 'src/common/types';
import { BoothsService } from 'src/booths/booths.service';
import { BoothInput } from 'src/booths/booths.resolver';
import { FeatureCommentInput, FeatureInput, FeatureVoteInput } from './mapal.resolver';

@Injectable()
export class MapalService {
  constructor(
    @InjectModel(Feature.name) private featureModel: Model<Feature>,
    @InjectModel(FeatureVote.name) private featureVoteModel: Model<FeatureVote>,
    @InjectModel(FeatureComment.name) private featureCommentModel: Model<FeatureComment>,
    @InjectModel(MapalBooth.name) private mapalBoothModel: Model<MapalBooth>,
    private readonly boothsService: BoothsService,
  ) { }

  // Feature methods
  async upsertFeature(userId: ID, input: FeatureInput, id?: string): Promise<Feature> {
    return upsert(this.featureModel, { ...input, user: userId }, id);
  }

  async features(boothId?: string) {
    const match = boothId ? { booth: boothId } : {};
    return aggregateFeed(
      this.featureModel,
      {},
      [
        { $match: match },
        {
          $lookup: {
            from: 'featurevotes',
            localField: '_id',
            foreignField: 'feature',
            as: 'votes'
          }
        },
        {
          $addFields: {
            totalVotes: {
              $reduce: {
                input: '$votes',
                initialValue: 0,
                in: { $add: ['$$value', '$$this.score'] }
              }
            }
          }
        },
        {
          $sort: {
            totalVotes: -1
          }
        }
      ]
    );
  }

  async feature(id: string): Promise<Feature> {
    const [feature] = await aggregate(this.featureModel, {}, [
      { $match: { _id: id } },
      {
        $lookup: {
          from: 'featurevotes',
          localField: '_id',
          foreignField: 'feature',
          as: 'votes'
        }
      },
      {
        $lookup: {
          from: 'featurecomments',
          localField: '_id',
          foreignField: 'feature',
          as: 'comments'
        }
      },
      {
        $lookup: {
          from: 'features',
          localField: '_id',
          foreignField: 'parent',
          as: 'children'
        }
      },
      {
        $addFields: {
          totalVotes: {
            $reduce: {
              input: '$votes',
              initialValue: 0,
              in: { $add: ['$$value', '$$this.score'] }
            }
          },
          totalComments: {
            $size: '$comments'
          }
        }
      }
    ]);
    return feature;
  }

  // FeatureVote methods
  async upsertVote(userId: ID, input: FeatureVoteInput, id?: string): Promise<FeatureVote> {
    return upsert(this.featureVoteModel, { ...input, user: userId }, id);
  }

  async featureVotes(featureId: string): Promise<FeatureVote[]> {
    return filter(this.featureVoteModel, { featureId });
  }

  // FeatureComment methods
  async upsertComment(userId: ID, input: FeatureCommentInput, id?: string): Promise<FeatureComment> {
    return upsert(this.featureCommentModel, { ...input, user: userId }, id);
  }

  async featureComments(featureId: string): Promise<FeatureComment[]> {
    return filter(this.featureCommentModel, { featureId });
  }

  async stampFeature(id: string, stampKey: string): Promise<Feature> {
    const update = {};
    update[`stamps.${stampKey}`] = new Date();
    return upsert(this.featureModel, update, id);
  }

  // MapalBooth methods
  async upsertMapalBooth(userId: ID, input: BoothInput, id?: string): Promise<any> {
    // First upsert the booth
    const booth = await this.boothsService.upsertBooth(userId, input, id);
    if (id) return booth;

    const mapalBooth = await upsert(this.mapalBoothModel, {
      booth: booth._id,
    });

    return { ...booth.toObject(), mapalBoothId: mapalBooth._id };
  }

  async mapalBooth(boothId: string): Promise<MapalBooth> {
    return filterOne(this.mapalBoothModel, { boothId });
  }

  async stampMapalBooth(id: string, stampKey: string): Promise<MapalBooth> {
    const update = {};
    update[`stamps.${stampKey}`] = new Date();
    return upsert(this.mapalBoothModel, update, id);
  }
} 