import { Inject, Injectable } from "@nestjs/common";
import { Cycle, CycleDocument } from "./schema/cycle.schema";
import mongoose, { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { ID } from "src/common/types";
import { aggregate, aggregateFeed, connect, fetchOne, filter, filterOne, upsert } from "src/common/utils/db";
import { SabbaticalsService } from "src/sabbaticals/sabbaticals.service";
import { CycleInput } from "./cycles.resolver";
import { CYCLE_GATEWAY_KEYS } from "./cycles.consts";

const connectGateway = (key) => connect(
    "gateways",
    key,
    "_id",
    key,
    [{ $addFields: { id: "$_id" } }])

@Injectable()
export class CyclesService {
    constructor(
        @InjectModel(Cycle.name) private cycleModel: Model<CycleDocument>,
        private readonly sabbaticalsService: SabbaticalsService
    ) { }

    async currentCycle(boothId: ID) {
        const result = await aggregate(
            this.cycleModel,
            [
                {
                    $match: {
                        booth: new mongoose.Types.ObjectId(boothId),
                        "stamps.completed": null,
                        "stamps.commenced": { $ne: null },
                    }
                },
                ...CYCLE_GATEWAY_KEYS.map(key => connectGateway(key)),
                {
                    $addFields: {
                        id: "$_id",
                        a: { $arrayElemAt: ["$a", 0] },
                        b: { $arrayElemAt: ["$b", 0] },
                        c: { $arrayElemAt: ["$c", 0] },
                        d: { $arrayElemAt: ["$d", 0] },
                        e: { $arrayElemAt: ["$e", 0] },
                        f: { $arrayElemAt: ["$f", 0] },
                        sabbatical: { $arrayElemAt: ["$sabbatical", 0] },
                        boothId: "$booth",
                    }
                }
            ]
        )
        return result[0];
    }

    async cycles(boothId: ID) {
        return aggregateFeed(
            this.cycleModel,
            { match: { booth: new mongoose.Types.ObjectId(boothId) } },
            []
        )
    }

    async completeCycle(id: ID) {
        return upsert(this.cycleModel, { completed: new Date() }, id);
    }

    async getCurrentCycle(boothId: ID) {
        return filterOne(this.cycleModel, { booth: boothId, 'stamps.completed': null, 'stamps.commenced': { $ne: null } });
    }

    async upsertCycle(input: CycleInput, id?: string) {
        if (!id) {
            const sabbatical = await this.sabbaticalsService.initSabbaticalGateway();
            input.sabbatical = sabbatical._id;
        }
        if (input.activateCycle) {
            input['stamps.commenced'] = new Date();
        }
        return upsert(this.cycleModel, {
            ...input,
            booth: input.boothId,
        }, id);
    }

    async completeCurrentCycle() {
        const cycle = await this.getCurrentCycle('boothId');
        if (cycle) {
            return this.completeCycle(cycle._id);
        }
    }
}