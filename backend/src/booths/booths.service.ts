import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Booth, BoothDocument } from "./schema/booth.schema";
import mongoose, { Model } from "mongoose";
import { aggregateFeed, count, create, filterOne, upsert, upsertOne } from "src/common/utils/db";
import { compactObject } from "src/common/utils/object";
import { ID } from "src/common/types";
import { MembershipService } from "src/auth/membership.service";

@Injectable()
export class BoothsService {
    constructor(
        @InjectModel(Booth.name) private boothModel: Model<BoothDocument>,
        // private membershipService: MembershipService
        @Inject(forwardRef(() => MembershipService)) private membershipService: MembershipService
    ) { }
    FREE_TIER_BOOTH_COUNT = 1;

    async booths(userId: ID) {
        await this.validateMembership(userId, this.FREE_TIER_BOOTH_COUNT + 1);
        return aggregateFeed(
            this.boothModel,
            { sort: { createdAt: -1 }, match: { user: new mongoose.Types.ObjectId(userId) } },
            []
        );
    }

    async activeBooth(userId: ID) {
        return filterOne(this.boothModel, {
            'stamps.completed': { $eq: null },
            'stamps.commenced': { $ne: null },
            user: new mongoose.Types.ObjectId(userId)
        });
    }

    async booth(userId: ID, id: string) {
        await this.validateMembership(userId, this.FREE_TIER_BOOTH_COUNT + 1);
        return filterOne(this.boothModel, {
            _id: new mongoose.Types.ObjectId(id),
            user: new mongoose.Types.ObjectId(userId)
        });
    }

    async validateMembership(userId: ID, count = this.FREE_TIER_BOOTH_COUNT) {
        const hasValidMembership = await this.membershipService.hasValidMembership(userId);
        if (!hasValidMembership) {
            const boothCount = await this.boothModel.countDocuments({ user: new mongoose.Types.ObjectId(userId) });
            if (boothCount >= count) {
                throw new Error("Create Membership to access more booths");
            }
        }
    }

    async upsertBooth(userId, input: any, id?: string) {
        if (!id) await this.validateMembership(userId);
        input.user = userId;
        if (!id) return create(this.boothModel, input);
        return upsertOne(this.boothModel, input, compactObject({ _id: id, user: id && userId }));
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

    async boothCount(filter) {
        return count(this.boothModel, filter);
    }

}