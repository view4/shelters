import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Booth, BoothDocument } from "./schema/booth.schema";
import { Model } from "mongoose";
import { aggregateFeed, fetchOne, filterOne, upsert } from "src/common/utils/db";

@Injectable()
export class BoothsService {
    constructor(
        @InjectModel(Booth.name) private boothModel: Model<BoothDocument>,
    ) { }

    async booths() {
        return aggregateFeed(
            this.boothModel,
            {},
            []
        )
    }

    async activeBooth() {
        return filterOne(this.boothModel, { 'stamps.completed': false, 'stamps.commenced': { $ne: null } });
    }

    async booth(id: string) {
        return fetchOne(this.boothModel, id);
    }

    async upsertBooth(input: any, id?: string) {
        return upsert(this.boothModel, input, id);
    }

    async stampBooth(id: string, key: string) {
        const data = {
            [`stamps.${key}`]: new Date()
        }
        return upsert(
            this.boothModel,
            data,
            id);
    }

}