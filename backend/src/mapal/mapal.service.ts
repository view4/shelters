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

  async features(boothId?: string, parentId?: string) {
    const match: any = boothId ? { booth: new mongoose.Types.ObjectId(boothId) } : {};
    if (parentId) match.parent = new mongoose.Types.ObjectId(parentId);

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
    console.log(id);
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
      },
      {
        $lookup: {
          from: 'featurelabels',
          localField: '_id',
          foreignField: 'feature',
          as: 'labels',
          pipeline: [
            {
              $lookup: {
                from: 'labels',
                localField: 'label',
                foreignField: '_id',
                as: 'label'
              }
            }
          ]
        }
      },
      // {
      //   $unwind: '$labels'
      // },
      // {
      //   $addFields: {
      //     label: '$labels.label'
      //   }
      // }
    ]);
    console.log(feature);
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
    return upsert(this.featureCommentModel, { ...input, user: userId, feature: input.featureId }, id);
  }

  async featureComments(featureId: string): Promise<FeatureComment[]> {
    return filter(this.featureCommentModel, { featureId });
  }

  async upsertLabel(userId: ID, name: string): Promise<LabelDocument> {
    return upsertOne(this.labelModel, { name, user: userId }, { name, user: userId });
  }

  async addFeatureLabel(userId: ID, input: FeatureLabelInput): Promise<Feature> {
    const { name, featureId, labelId } = input;
    const label = labelId ? await this.upsertLabel(userId, name) : null;
    const existingFeatureLabel = await filterOne(this.featureLabelModel, { feature: featureId, label: label._id });
    if (existingFeatureLabel) throw new Error('Feature already has this label');
    return upsertOne(
      this.featureLabelModel,
      { feature: featureId, label: labelId ?? label._id, user: userId },
      { feature: featureId, label: labelId ?? label._id }
    );
  }

  async removeFeatureLabel(featureLabelId: string): Promise<boolean> {
    return del(this.featureLabelModel, featureLabelId);
  }

  async boothLabels(boothId: string): Promise<FeatureLabel[]> {
    // Use a single aggregation pipeline to get all features and their labels
    const result = await aggregate(this.featureModel, [
      // Start with features directly in the booth
      {
        $match: {
          booth: new mongoose.Types.ObjectId(boothId)
        }
      },
      // Use $graphLookup to recursively find all child features
      {
        $graphLookup: {
          from: 'features',
          startWith: '$_id',
          connectFromField: '_id',
          connectToField: 'parent',
          as: 'descendants',
          depthField: 'depth'
        }
      },
      // Unwind the descendants array to get individual features
      {
        $unwind: {
          path: '$descendants',
          preserveNullAndEmptyArrays: false
        }
      },
      // Replace the root with the descendant feature
      {
        $replaceRoot: {
          newRoot: '$descendants'
        }
      },
      // Add back the original feature as well
      {
        $unionWith: {
          coll: 'features',
          pipeline: [
            {
              $match: {
                booth: new mongoose.Types.ObjectId(boothId)
              }
            }
          ]
        }
      },
      // Remove duplicates
      {
        $group: {
          _id: '$_id',
          feature: { $first: '$$ROOT' }
        }
      },
      // Replace root with the feature
      {
        $replaceRoot: {
          newRoot: '$feature'
        }
      },
      // Now lookup the feature labels
      {
        $lookup: {
          from: 'featurelabels',
          localField: '_id',
          foreignField: 'feature',
          as: 'featureLabels'
        }
      },
      // Unwind the feature labels
      {
        $unwind: {
          path: '$featureLabels',
          preserveNullAndEmptyArrays: false
        }
      },
      // Replace root with the feature label
      {
        $replaceRoot: {
          newRoot: '$featureLabels'
        }
      },
      // Lookup the actual label details
      {
        $lookup: {
          from: 'labels',
          localField: 'label',
          foreignField: '_id',
          as: 'label'
        }
      },
      // Unwind the label
      {
        $unwind: {
          path: '$label',
          preserveNullAndEmptyArrays: false
        }
      },
      // Add the id field
      {
        $addFields: {
          id: '$_id',
          featureId: '$feature',
          labelId: '$label'
        }
      }
    ]);

    return result;
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