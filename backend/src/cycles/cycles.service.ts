import { Injectable } from "@nestjs/common";
import { Cycle, CycleDocument } from "./schema/cycle.schema";
import mongoose, { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { ID } from "src/common/types";
import { aggregate, aggregateFeed, connect, filterOne, upsert } from "src/common/utils/db";
import { SabbaticalsService } from "src/sabbaticals/sabbaticals.service";
import { CycleInput } from "./cycles.resolver";
import { CYCLE_GATEWAY_KEYS } from "./cycles.consts";
import { BoothsService } from "src/booths/booths.service";

const connectGateway = (key) => connect(
    "gateways",
    key,
    "_id",
    key,
    [
        { $addFields: { id: "$_id" } }
    ]
)

@Injectable()
export class CyclesService {
    constructor(
        @InjectModel(Cycle.name) private cycleModel: Model<CycleDocument>,
        private readonly sabbaticalsService: SabbaticalsService,
        private readonly boothsService: BoothsService
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
                ...CYCLE_GATEWAY_KEYS.slice(0, -1).map(key => connectGateway(key)),
                connect("sabbaticalgateways", "sabbatical", "_id", "sabbatical", [
                    connect("gateways", "gateway", "_id", "gateway", [{ $addFields: { id: "$_id" } }]),
                    { $addFields: { gateway: { $arrayElemAt: ["$gateway", 0] } } }
                ]),
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
        return upsert(this.cycleModel, { 'stamps.completed': new Date() }, id);
    }

    async getCurrentCycle(boothId: ID) {
        const filter = { booth: boothId, 'stamps.completed': null, 'stamps.commenced': { $ne: null } };
        if (!boothId) {
            const booth = await this.boothsService.activeBooth();
            filter.booth = booth._id;
        }
        return filterOne(this.cycleModel, filter);
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
        const booth = await this.boothsService.activeBooth();
        const cycle = await this.getCurrentCycle(booth?._id);
        console.log(cycle)
        if (cycle) {
            return await this.completeCycle(cycle._id);
        }
    }
}