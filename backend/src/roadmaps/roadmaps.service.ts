import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Gateway, GatewayDocument } from "./schema/gateway.schema";
import mongoose, { Model } from "mongoose";
import { aggregateFeed, connect, filter, upsert } from "src/common/utils/db";
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

    async roadmap(id: ID) {
        const result = await this.aggregateFeed({ limit: 1, match: { _id: new mongoose.Types.ObjectId(id) } });
        return result.entities[0];
    }

    async gateways(boothId?: ID, parentId?: ID, gatewayId?: ID) {
        return aggregateFeed(
            this.gatewayModel,
            {
                match: compactObject({
                    booth: boothId && new mongoose.Types.ObjectId(boothId),
                    parent: parentId && new mongoose.Types.ObjectId(parentId),
                    roadmap: gatewayId && new mongoose.Types.ObjectId(gatewayId),
                }),
            },
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