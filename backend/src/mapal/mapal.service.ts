import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Feature } from './schema/feature.schema';
import { FeatureVote } from './schema/feature-vote.schema';
import { FeatureComment } from './schema/feature-comment.schema';
import { MapalBooth } from './schema/mapal-booth.schema';
import { aggregate, aggregateFeed, fetchOne, filter, filterOne, upsert, upsertOne } from 'src/common/utils/db';
import { ID } from 'src/common/types';
import { BoothsService } from 'src/booths/booths.service';
import { BoothInput } from 'src/booths/booths.resolver';
import { FeatureCommentInput, FeatureInput, FeatureVoteInput } from './schema/feature-inputs.schema';
import { CommentsService } from 'src/entries/comments.service';

@Injectable()
export class MapalService {
  constructor(
    @InjectModel(Feature.name) private featureModel: Model<Feature>,
    @InjectModel(FeatureVote.name) private featureVoteModel: Model<FeatureVote>,
    @InjectModel(FeatureComment.name) private featureCommentModel: Model<FeatureComment>,
    @InjectModel(MapalBooth.name) private mapalBoothModel: Model<MapalBooth>,
    private readonly boothsService: BoothsService,
    private readonly commentsService: CommentsService,
  ) { }

  // Feature methods
  async upsertFeature(userId: ID, input: FeatureInput, id?: string): Promise<Feature> {
    return upsert(this.featureModel, {
      ...input,
      booth: input.boothId,
      user: userId,
      stamps: id ? {} : {
        prospective: new Date()
      }
    }, id);
  }

  async features(boothId?: string) {
    const match = boothId ? { booth: new mongoose.Types.ObjectId(boothId) } : {};
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

  async feature(id: ID): Promise<Feature> {
    const [feature] = await aggregate(this.featureModel, [
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      { $limit: 1 },
      {
        $lookup: {
          from: 'featurevotes',
          localField: '_id',
          foreignField: 'feature',
          as: 'votes',
          pipeline: [
            { $addFields: { id: '$_id' } }
          ]
        }
      },
      {
        $lookup: {
          from: 'featurecomments',
          localField: '_id',
          foreignField: 'feature',
          as: 'featureComments'
        }
      },
      {
        $lookup: {
          from: 'comments',
          localField: 'featureComments.comment',
          foreignField: '_id',
          as: 'comments',
          pipeline: [
            { $addFields: { id: '$_id' } }
          ]
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
          id: '$_id',
          boothId: '$booth',
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
    return upsert(this.featureVoteModel, { ...input, user: userId, feature: input.featureId }, id);
  }

  async featureVotes(featureId: string): Promise<FeatureVote[]> {
    return filter(this.featureVoteModel, { featureId });
  }

  // FeatureComment methods
  async upsertComment(userId: ID, input: FeatureCommentInput, id?: string): Promise<FeatureComment> {
    // First create/update the base comment
    const comment = await this.commentsService.upsertComment(userId, { text: input.text }, id);
    
    // Then create/update the feature-specific reference
    return upsertOne(this.featureCommentModel, {
      comment: comment._id,
      feature: input.featureId,
    }, {
      comment: comment._id,
      feature: input.featureId,
    });
  }

  async featureComments(featureId: string): Promise<FeatureComment[]> {
    return filter(this.featureCommentModel, { featureId });
  }

  async stampFeature(id: string, key: string): Promise<Feature> {
    return upsert(this.featureModel, {
      [`stamps.${key}`]: new Date()
    }, id);
  }

  // MapalBooth methods
  async upsertMapalBooth(userId: ID, input: BoothInput, id?: string): Promise<any> {
    const booth = await this.boothsService.upsertBooth(userId, input, id);
    if (id) return booth;

    const mapalBooth = await upsert(this.mapalBoothModel, {
      booth: booth._id,
    });

    return { ...booth.toObject(), id: booth._id, mapalBoothId: mapalBooth._id };
  }

  async mapalBooth(boothId: string): Promise<MapalBooth> {
    return filterOne(this.mapalBoothModel, { boothId });
  }
} 