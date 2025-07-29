import { FeedParams, ID } from "src/common/types";
import mongoose, { Model } from "mongoose";
import { BoothDocument } from "./schema/booth.schema";
import { aggregateFeed } from "src/common/utils/db";


export type BoothsFilter = {
    userId?: ID;
    parentId?: ID;
    kind?: "mapal" | "malchut";
}

export const parseBoothFilters = (filter: BoothsFilter) => {
    const { userId, parentId, kind } = filter;
    const pipeline = [];
    const match = {
        user: new mongoose.Types.ObjectId(userId),
        parent: parentId ? new mongoose.Types.ObjectId(parentId) : null
    }

    if (kind) {
        pipeline.push({
            $match: {
                kind
            }
        })
    }
    
    return {
        match,
        pipeline
    }
}

export const aggregateBooths = (model: Model<BoothDocument>, filter: BoothsFilter, feedParams?: FeedParams, pipeline: any[] = []) => {
    const { match, pipeline: filteredPipeline } = parseBoothFilters(filter);
    return aggregateFeed(
        model,
        {
            sort: { createdAt: -1 },
            match,
            ...feedParams
        },
        [
            {
                $lookup: {
                    from: 'booths',
                    localField: 'parent',
                    foreignField: '_id',
                    as: 'parent',
                    pipeline: [
                        {
                            $addFields: {
                                id: '$_id',
                            }
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: 'mapalbooths',
                    localField: '_id',
                    foreignField: 'booth',
                    as: 'mapal',
                    pipeline: [
                        {
                            $addFields: {
                                id: '$_id',
                            }
                        }
                    ]
                },
            },
            {
                $lookup: {
                    from: 'malchutbooths',
                    localField: '_id',
                    foreignField: 'booth',
                    as: 'malchut',
                    pipeline: [
                        {
                            $addFields: {
                                id: '$_id',
                            }
                        }
                    ]
                }
            },
            {
                $addFields: {
                  kind: {
                    $cond: {
                      if: { $gt: [{ $size: '$mapal' }, 0] },
                      then: 'mapal',
                      else: {
                        $cond: {
                          if: { $gt: [{ $size: '$malchut' }, 0] },
                          then: 'malchut',
                          else: 'life'
                        }
                      }
                    }
                  },
                  parent: { $first: '$parent' },
                  mapal: { $first: '$mapal' },
                  malchut: { $first: '$malchut' }
                }
              },
            ...pipeline,
            ...filteredPipeline
        ]
    );
}