import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Feature } from './schema/feature.schema';
import { FeatureVote } from './schema/feature-vote.schema';
import { FeatureComment } from './schema/feature-comment.schema';
import { MapalBooth } from './schema/mapal-booth.schema';
import { FeatureLabel } from './schema/feature-label.schema';
import { aggregate, aggregateFeed, fetchOne, filter, filterOne, upsert, upsertOne, del } from 'src/common/utils/db';
import { ID } from 'src/common/types';
import { BoothsService } from 'src/booths/booths.service';
import { BoothInput } from 'src/booths/booths.resolver';
import { FeatureCommentInput, FeatureInput, FeatureVoteInput, FeatureLabelInput } from './schema/feature-inputs.schema';
import { Label, LabelDocument } from 'src/common/schemas/label.schema';
import { compactObject } from 'src/common/utils/object';
import { aggregateBoothLabels, aggregateFeature } from './mapal.utils';
import { CommentsService } from 'src/entries/comments.service';

@Injectable()
export class MapalService {
  constructor(
    @InjectModel(Feature.name) private featureModel: Model<Feature>,
    @InjectModel(FeatureVote.name) private featureVoteModel: Model<FeatureVote>,
    @InjectModel(FeatureComment.name) private featureCommentModel: Model<FeatureComment>,
    @InjectModel(MapalBooth.name) private mapalBoothModel: Model<MapalBooth>,
    @InjectModel(FeatureLabel.name) private featureLabelModel: Model<FeatureLabel>,
    @InjectModel(Label.name) private labelModel: Model<Label>,
    private readonly boothsService: BoothsService,
    private readonly commentsService: CommentsService,
  ) { }

  // Feature methods
  async upsertFeature(userId: ID, input: FeatureInput, id?: string): Promise<Feature> {
    return upsert(this.featureModel, compactObject({
      ...input,
      booth: input.boothId,
      parent: input.parentId,
      user: userId,
      stamps: id ? null : {
        prospective: new Date()
      }
    }), id);
  }

  async features(boothId?: string, parentId?: string) {
    const match: any = boothId ? { booth: new mongoose.Types.ObjectId(boothId) } : {};
    match.parent = parentId ? new mongoose.Types.ObjectId(parentId) : null;

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
    const [feature] = await aggregateFeature(this.featureModel, id);
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

  async upsertLabel(userId: ID, name: string): Promise<LabelDocument> {
    return upsertOne(this.labelModel, { name, user: userId }, { name, user: userId }, { new: true });
  }

  async addFeatureLabel(userId: ID, input: FeatureLabelInput): Promise<Feature> {
    const { name, featureId } = input;
    let labelId = input.labelId;
    if (!labelId) {
      const newLabel = await this.upsertLabel(userId, name);
      labelId = String(newLabel._id);
    }
    const existingFeatureLabel = await filterOne(this.featureLabelModel, { feature: featureId, label: labelId });
    if (existingFeatureLabel) throw new Error('Feature already has this label');
    return upsertOne(
      this.featureLabelModel,
      { feature: featureId, label: labelId, user: userId },
      { feature: featureId, label: labelId }
    );
  }

  async removeFeatureLabel(featureLabelId: string): Promise<boolean> {
    return del(this.featureLabelModel, featureLabelId);
  }

  async boothLabels(boothId: string): Promise<FeatureLabel[]> {
    return aggregateBoothLabels(this.featureModel, boothId);
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