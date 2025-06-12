import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Booth, BoothDocument } from "./schema/booth.schema";
import mongoose, { Model, Types } from "mongoose";
import { aggregate, aggregateFeed, count, create, filterOne, upsert, upsertOne } from "src/common/utils/db";
import { compactObject } from "src/common/utils/object";
import { FeedParams, ID } from "src/common/types";
import { MembershipService } from "src/auth/membership.service";

@Injectable()
export class BoothsService {
    constructor(
        @InjectModel(Booth.name) private boothModel: Model<BoothDocument>,
        @Inject(forwardRef(() => MembershipService)) private membershipService: MembershipService
    ) { }
    FREE_TIER_BOOTH_COUNT = 1;

    async booths(userId: ID, feedParams?: FeedParams, pipeline: any[] = []) {
        // await this.validateMembership(userId, this.FREE_TIER_BOOTH_COUNT + 1);
        const res = await aggregateFeed(
            this.boothModel,
            {
                sort: { createdAt: -1 },
                match: { user: new mongoose.Types.ObjectId(userId) },
                ...feedParams
            },
            [
                {
                    $lookup: {
                        from: 'mapalbooths',
                        localField: '_id',
                        foreignField: 'booth',
                        as: 'mapal',
                        pipeline: [
                            {
                                $addFields: {
                                    id: '$_id',
                                }
                            }
                        ]
                    },
                },
                {
                    $addFields: {
                        mapal: {
                            $first: '$mapal'
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'malchutbooths',
                        localField: '_id',
                        foreignField: 'booth',
                        as: 'malchut',
                    }
                },
                {
                    $addFields: {
                        malchut: {
                            $first: '$malchut'
                        }
                    }
                },
                ...pipeline
            ]
        );
        return res;
    }

    async activeBooths(userId: ID) {
        return this.booths(userId, {
            match: {
                user: new mongoose.Types.ObjectId(userId),
                'stamps.completed': { $eq: null },
                'stamps.commenced': { $ne: null }
            }
        });
    }

    async focusedBooth(userId: ID) {
        return filterOne(this.boothModel, {
            user: new mongoose.Types.ObjectId(userId),
            'stamps.focused': { $ne: null }
        }, { sort: { 'stamps.focused': -1 } });
    }

    async booth(userId: ID, id: string) {
        await this.validateMembership(userId, this.FREE_TIER_BOOTH_COUNT + 1);
        const [booth] = await aggregate(this.boothModel, [
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id),
                    user: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $limit: 1
            },
            {
                $lookup: {
                    from: 'mapalbooths',
                    localField: '_id',
                    foreignField: 'booth',
                    as: 'mapal',
                    pipeline: [
                        {
                            $addFields: {
                                id: '$_id',
                            }
                        }
                    ]
                }
            },
            {
                $addFields: {
                    mapal: { $first: '$mapal' },
                    id: '$_id'
                }
            }
        ])
        return booth;
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

    async assignBoothToUser(boothId: string, userId: string) {
        return upsert(this.boothModel, { user: userId }, boothId);
    }

    async checkBoothIsFocused(booth) {
        if (!booth?.stamps?.focused) return false;
        const focusedBooth = await this.focusedBooth(booth.user);
        return focusedBooth?._id.equals(booth._id);
    }

}