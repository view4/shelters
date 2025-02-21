import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Booth, BoothDocument } from "./schema/booth.schema";
import mongoose, { Model } from "mongoose";
import { aggregateFeed, filterOne, upsert, upsertOne } from "src/common/utils/db";
import { compactObject } from "src/common/utils/object";
import { ID } from "src/common/types";

@Injectable()
export class BoothsService {
    constructor(
        @InjectModel(Booth.name) private boothModel: Model<BoothDocument>,
    ) { }

    async booths(userId: ID) {
        return aggregateFeed(
            this.boothModel,
            { sort: { createdAt: -1 }, match: { userId: new mongoose.Types.ObjectId(userId) } },
            []
        );
    }

    async activeBooth(userId: ID) {
        return filterOne(this.boothModel, {
            'stamps.completed': { $eq: null },
            'stamps.commenced': { $ne: null },
            userId: new mongoose.Types.ObjectId(userId)
        });
    }

    async booth(userId: ID, id: string) {
        return filterOne(this.boothModel, {
            _id: new mongoose.Types.ObjectId(id),
            userId: new mongoose.Types.ObjectId(userId)
        });
    }

    async upsertBooth(userId, input: any, id?: string) {
        return upsertOne(this.boothModel, input, compactObject({ _id: id, userId }));
    }

    async stampBooth(id: string, key: string) {
        const data = {
            [`stamps.${key}`]: new Date()
        }
        return upsert(
            this.boothModel,
            data,
            id
        );
    }

}