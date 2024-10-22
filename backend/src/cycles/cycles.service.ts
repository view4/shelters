import { Inject, Injectable } from "@nestjs/common";
import { Cycle, CycleDocument } from "./schema/cycle.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { ID } from "src/common/types";
import { fetchOne, filter, upsert } from "src/common/utils/db";
import { SabbaticalsService } from "src/sabbaticals/sabbaticals.service";
import { CycleInput } from "./cycles.resolver";

@Injectable()
export class CyclesService {
    constructor(
        @InjectModel(Cycle.name) private cycleModel: Model<CycleDocument>,
        private readonly sabbaticalsService: SabbaticalsService
    ) { }

    async currentCycle(boothId: ID) {
        return fetchOne(this.cycleModel, { booth: boothId, completed: null });
    }

    async cycles(boothId: ID) {
        return filter(this.cycleModel, { booth: boothId });
    }

    async completeCycle(id: ID) {
        return upsert(this.cycleModel, { completed: new Date() }, id);
    }

    async upsertCycle(input: CycleInput, id?: string) {
        if(!id) {
            input.sabbatical = await this.sabbaticalsService.initSabbaticalGateway();
        }
        return upsert(this.cycleModel, input, id);
    }

}