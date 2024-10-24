import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Gateway, GatewayDocument } from "./schema/gateway.schema";
import { Model } from "mongoose";
import { filter, upsert } from "src/common/utils/db";
import { compactObject } from "src/common/utils/object";
import { RoadmapInput } from "./roadmaps.resolver";
import { ID } from "src/common/types";
import { Roadmap, RoadmapDocument } from "./schema/roadmap.schema";

@Injectable()
export class RoadmapsService {
    constructor(
        @InjectModel(Gateway.name) private gatewayModel: Model<GatewayDocument>,
        @InjectModel(Roadmap.name) private roadmapModel: Model<RoadmapDocument>
    ) { }

    async roadmaps(boothId?: ID, parentId?: ID) {
        const query = { boothId, parentId };
        return filter(this.gatewayModel, compactObject(query));
    }

    async upsertGateway(input: RoadmapInput, id?: ID) {
        return upsert(this.gatewayModel, {
            booth: input.boothId,
            parent: input.parentId,
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
            [key]: new Date(),
        }), id);
    };

    async stampRoadmap(id: ID, key: string) {
        return upsert(this.roadmapModel, compactObject({
            [key]: new Date(),
        }), id);
    }
}