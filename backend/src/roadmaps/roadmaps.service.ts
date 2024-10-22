import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Gateway, GatewayDocument } from "./schema/gateway.schema";
import { Model } from "mongoose";
import { filter, upsert } from "src/common/utils/db";
import { compactObject } from "src/common/utils/object";
import { RoadmapInput } from "./roadmaps.resolver";
import { ID } from "src/common/types";

@Injectable()
export class RoadmapsService {
    constructor(
        @InjectModel(Gateway.name) private gatewayModel: Model<GatewayDocument>,
    ) { }

    async roadmaps(boothId?: ID, parentId?: ID) {
        const query = { boothId, parentId };
        return filter(this.gatewayModel, compactObject(query));
    }

    async upsertRoadmap(input: RoadmapInput, id?: ID) {
        return upsert(this.gatewayModel, {
            booth: input.boothId,
            parent: input.parentId,
            text: input.text,
            name: input.name,
        }, id);
    }

    async stampRoadmap(id: ID, commenced: boolean, completed: boolean) {
        return upsert(this.gatewayModel, compactObject({
            'stamps.commenced': commenced && new Date(),
            'stamps.completed': completed && new Date(),
        }), id);
    }
}