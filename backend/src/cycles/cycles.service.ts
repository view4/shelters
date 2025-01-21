import { Injectable } from "@nestjs/common";
import { Cycle, CycleDocument } from "./schema/cycle.schema";
import mongoose, { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { ID } from "src/common/types";
import { aggregate, aggregateFeed, connect, fetchOne, filter, filterOne, upsert } from "src/common/utils/db";
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
        { $addFields: { id: "$_id" } },
        connect(
            "gateways",
            "parent",
            "_id",
            "parent",
            [
                {
                    "$addFields": {
                        id: "$_id",
                    }
                },

            ]
        ),
        {
            "$addFields": {
                parent: {
                    $arrayElemAt: ["$parent", 0]
                }

            }

        },

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
                ...this.buildPipeline(boothId)
            ]
        )
        return result[0];
    }

    async cycles(boothId: ID) {
        return aggregateFeed(
            this.cycleModel,
            { match: { booth: new mongoose.Types.ObjectId(boothId) } },
            [
                {
                    $match: {
                        booth: new mongoose.Types.ObjectId(boothId),
                        "stamps.completed": { $ne: null }, //default to returning completed cycles
                        "stamps.commenced": { $ne: null },
                    }
                },
                ...this.buildPipeline(boothId),
                { $sort: { 'stamps.commenced': -1 } }
            ]
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


    async validateAddGatewayToCycle(gatewayId: ID) {
        const existingCycle = await filter(this.cycleModel, {
            $or: [
                { 'a': gatewayId },
                { 'b': gatewayId },
                { 'c': gatewayId },
                { 'd': gatewayId },
                { 'e': gatewayId },
                { 'f': gatewayId },
            ]
        })
        if (existingCycle.length) {
            throw new Error('Gateway already exists in a cycle');
        }
    }
    async addGatewayToCurrentCycle(gatewayId: ID) {
        await this.validateAddGatewayToCycle(gatewayId);
        const booth = await this.boothsService.activeBooth();
        const cycle = await this.getCurrentCycle(booth?._id);
        if (!cycle) throw new Error('Active cycle not found');
        const isFull = CYCLE_GATEWAY_KEYS?.slice(0, -1).every(key => Boolean(cycle[key]));
        if (isFull) throw new Error('Cycle is full');
        for (const key of CYCLE_GATEWAY_KEYS?.slice(0, -1)) {
            if (!cycle[key]) {
                cycle[key] = gatewayId;
                break;
            }
        }
        await cycle.save();
        return cycle;
    }

    async addGatewayToCycle(gatewayId: ID, cycleId?: ID) {
        if (!cycleId) return this.addGatewayToCurrentCycle(gatewayId);
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
        if (cycle) {
            return await this.completeCycle(cycle._id);
        }
    }

    buildPipeline = (boothId) => [

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
}