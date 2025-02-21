import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Booth, BoothDocument } from "./schema/booth.schema";
import mongoose, { Model } from "mongoose";
import { aggregateFeed, filterOne, upsert, upsertOne } from "src/common/utils/db";
import { compactObject } from "src/common/utils/object";
import { ID } from "src/common/types";
import { MembershipService } from "src/auth/membership.service";

@Injectable()
export class BoothsService {
    constructor(
        @InjectModel(Booth.name) private boothModel: Model<BoothDocument>,
        private membershipService: MembershipService
    ) { }
    FREE_TIER_BOOTH_COUNT = 1;

    async booths(userId: ID) {
        await this.validateMembership(userId, this.FREE_TIER_BOOTH_COUNT + 1);
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
        await this.validateMembership(userId, this.FREE_TIER_BOOTH_COUNT + 1);
        return filterOne(this.boothModel, {
            _id: new mongoose.Types.ObjectId(id),
            userId: new mongoose.Types.ObjectId(userId)
        });
    }

    async validateMembership(userId: ID, count = this.FREE_TIER_BOOTH_COUNT) {
        const hasValidMembership = await this.membershipService.hasValidMembership(userId);
        if (!hasValidMembership) {
            const boothCount = await this.boothModel.countDocuments({ userId: new mongoose.Types.ObjectId(userId) });
            if (boothCount >= count) {
                throw new Error("Create Membership to access more booths");
            }
        }
    }

    async upsertBooth(userId, input: any, id?: string) {
        if (!id) await this.validateMembership(userId);
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