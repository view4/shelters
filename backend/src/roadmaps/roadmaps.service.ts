import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Gateway, GatewayDocument } from "./schema/gateway.schema";
import mongoose, { Model } from "mongoose";
import { aggregateFeed, connect, fetchOne, upsert } from "src/common/utils/db";
import { compactObject } from "src/common/utils/object";
import { GatewayInput, RoadmapInput } from "./roadmaps.resolver";
import { FeedParams, ID } from "src/common/types";
import { Roadmap, RoadmapDocument } from "./schema/roadmap.schema";

@Injectable()
export class RoadmapsService {
    constructor(
        @InjectModel(Gateway.name) private gatewayModel: Model<GatewayDocument>,
        @InjectModel(Roadmap.name) private roadmapModel: Model<RoadmapDocument>
    ) { }

    async roadmaps(boothId?: ID, parentId?: ID) {
        return this.aggregateFeed(
            {
                match: compactObject({
                    booth: boothId && new mongoose.Types.ObjectId(boothId),
                    parent: parentId ? new mongoose.Types.ObjectId(parentId) : {
                        $exists: false,
                    },
                })
            }
        )
    };

    async aggregateFeed(feedParams: FeedParams, pipeline = []) {
        const p = [
            connect(
                "gateways",
                "_id",
                "roadmap",
                "gateways",
                [
                    {
                        "$addFields": {
                            id: "$_id",
                        }
                    }
                ]
            ),
            connect(
                "roadmaps",
                "_id",
                "parent",
                "children",
                [
                    {
                        "$addFields": {
                            id: "$_id",
                        }
                    }
                ]
            ),
            ...pipeline
        ]
        return aggregateFeed(this.roadmapModel, feedParams, p);
    }

    async gateway(id: ID) {
        return fetchOne(this.gatewayModel, id);
    }

    async gateways(boothId?: ID, parentId?: ID, isCycleless?: Boolean, feedParams?: FeedParams) {
        const params = {
            ...feedParams,
            match: compactObject({
                booth: boothId && new mongoose.Types.ObjectId(boothId),
                parent: parentId && new mongoose.Types.ObjectId(parentId),
            }),
            sort: {
                createdAt: -1
            },
        }
        const pipeline = [];
        if (isCycleless) {
            delete params['match']
            pipeline.push(
                ...lookupCycless(boothId)
            )
        }
        return aggregateFeed(
            this.gatewayModel,
            params,
            pipeline
        );
    }

    async upsertGateway(input: GatewayInput, id?: ID) {
        return upsert(this.gatewayModel, {
            booth: input.boothId,
            parent: input.parentId,
            roadmap: input.roadmapId,
            text: input.text,
            name: input.name,
        }, id);
    }

    async upsertRoadmap(input: RoadmapInput, id?: ID) {
        return upsert(this.roadmapModel, {
            booth: input.boothId,
            text: input.text,
            name: input.name,
            parent: input.parentId,
        }, id);
    }

    async stampGateway(id: ID, key: string) {
        return upsert(this.gatewayModel, compactObject({
            [`stamps.${key}`]: new Date(),
        }), id);
    };

    async stampRoadmap(id: ID, key: string) {
        return upsert(this.roadmapModel, compactObject({
            [`stamps.${key}`]: new Date(),
        }), id);
    }
}

const lookupCycless = (boothId: ID) => {
    const pipeline = [];
    pipeline.push({
        $graphLookup: {
            from: "gateways",
            startWith: "$_id",
            connectToField: "_id",
            connectFromField: "parent",
            as: "heritage",
            maxDepth: 36,
            depthField: "depth",
        }
    })
    pipeline.push({
        $addFields: {
            boothMatch: {
                $gt: [
                    {
                        $size: {
                            $filter: {
                                input: "$heritage",
                                as: "h",
                                cond: { $eq: ["$$h.booth", new mongoose.Types.ObjectId(boothId)] }
                            }

                        }
                    }, 0
                ]
            }
        }
    })
    pipeline.push({
        $match: {
            boothMatch: true
        }
    })
    pipeline.push({
        $lookup: {
            from: "cycles",
            let: { gatewayId: "$_id" },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $or: [
                                { $eq: ["$a", "$$gatewayId"] },
                                { $eq: ["$b", "$$gatewayId"] },
                                { $eq: ["$c", "$$gatewayId"] },
                                { $eq: ["$d", "$$gatewayId"] },
                                { $eq: ["$e", "$$gatewayId"] },
                                { $eq: ["$f", "$$gatewayId"] }
                            ]
                        }
                    }
                }
            ],
            as: 'cycles'
        }
    })

    pipeline.push({
        $match: {
            cycles: { $size: 0 },
            'stamps.completed': null,
        }
    })
    return pipeline;
}