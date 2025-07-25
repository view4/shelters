import { FeedParams, ID } from "src/common/types";
import mongoose, { Model } from "mongoose";
import { BoothDocument } from "./schema/booth.schema";
import { compactObject } from "src/common/utils/object";
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
                $addFields: {
                    mapal: {
                        $first: '$mapal'
                    }
                }
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
                    malchut: {
                        $first: '$malchut'
                    }
                }
            },
            {
                $addFields: {
                    kind: {
                        $cond: {
                            if: { $ne: ['$mapal', null] },
                            then: 'mapal',
                            else: {
                                $cond: {
                                    if: { $ne: ['$malchut', null] },
                                    then: 'malchut',
                                    else: 'regular'
                                }
                            }
                        }
                    }
                }
            },
            ...pipeline,
            ...filteredPipeline
        ]
    );
}