import { aggregate } from 'src/common/utils/db';
import mongoose from "mongoose";
import { Model } from "mongoose";
import { ID } from 'src/common/types';

export const aggregateFeature = (model: Model<any>, id: ID) =>  aggregate(model, [
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
        as: 'children',
        pipeline: [
          { $addFields: { id: '$_id' } }
        ]
      }
    },
    {
      $lookup: {
        from: 'features',
        localField: 'parent',
        foreignField: '_id',
        as: 'parent',
        pipeline: [
          { $addFields: { id: '$_id' } }
        ]
      }
    },
    {
      $unwind: {
        path: '$parent',
        preserveNullAndEmptyArrays: true
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
          },
          { $unwind: { path: '$label', preserveNullAndEmptyArrays: true } },
          {
            $addFields: {
              labelId: '$label._id',
              featureId: '$feature',
              name: '$label.name'
            }
          },
          {
            $project: {
              id: '$_id',
              labelId: 1,
              featureId: 1,
              user: 1,
              createdAt: 1,
              updatedAt: 1,
              name: 1
            }
          }
        ]
      }
    }
  ]);
export const aggregateBoothLabels = (model: Model<any>, boothId: ID) => aggregate(model, [
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
        labelId: '$label',
        name: '$label.name'
      }
    }
  ]);