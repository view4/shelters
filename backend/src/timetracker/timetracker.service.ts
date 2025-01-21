import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DedicatedTime, DedicatedTimeDocument } from "./schema/dedicated-time.schema";
import mongoose, { Model } from "mongoose";
import { TrackedTime, TrackedTimeDocument } from "./schema/tracked-time.schema ";
import { aggregate, aggregateFeed, connect, upsert, del } from "src/common/utils/db";
import { compactObject } from "src/common/utils/object";
import { DedicatedTimeInput, TrackedTimeInput } from "./timetracker.resolver";
import { ID } from "src/common/types";


@Injectable()
export class TimetrackerService {
    constructor(
        @InjectModel(DedicatedTime.name) private dedicatedTimeModel: Model<DedicatedTimeDocument>,
        @InjectModel(TrackedTime.name) private trackedTimeModel: Model<TrackedTimeDocument>,
    ) { }

    async dedicatedTimes(
        boothId?: ID,
        parentId?: ID,
        feedParams?: any
    ) {
        return aggregateFeed(
            this.dedicatedTimeModel,
            {
                match: compactObject({
                    ...feedParams?.match,
                    booth: boothId && new mongoose.Types.ObjectId(boothId),
                    parent: parentId ? new mongoose.Types.ObjectId(parentId) : {
                        $exists: false
                    }
                }),
                sort: { createdAt: -1 }
            },
            this.pipeline
        );
    }

    pipeline = [
        connect(
            "dedicatedtimes",
            "_id",
            "parent",
            "children",
            [
                connect(
                    "trackedtimes",
                    "_id",
                    "dedicatedTime",
                    "trackedTimes"

                ),
                {
                    $addFields: {
                        trackedTime: {
                            $sum: "$trackedTimes.mins"
                        },
                        id: "$_id"
                    }
                }
            ]
        ),

        {
            $addFields: {
                trackedTime: {
                    $sum: ["$children.trackedTime"],

                },
                totalMins: {
                    $sum: `$children.mins`
                },
                id: "$_id"
            }
        }
    ]

    async dedicatedTime(
        id: ID
    ) {
        const res = await aggregate(
            this.dedicatedTimeModel,
            [{
                $match: { _id: new mongoose.Types.ObjectId(id) },

            },
            connect(
                "trackedtimes",
                "_id",
                "dedicatedTime",
                "trackedTimes"
            ),
            {
                $addFields: {
                    trackedTime: {
                        $sum: "$trackedTimes.mins"
                    },
                    id: "$_id"
                }
            },]
        )
        return res?.[0];
    }


    async trackedTimes(
        dedicatedTimeId: ID
    ) {
        return aggregateFeed(
            this.trackedTimeModel,
            {
                match: { dedicatedTime: new mongoose.Types.ObjectId(dedicatedTimeId) }
            },
        )
    }

    async upsertDedicatedTime(input: DedicatedTimeInput, id?: string) {
        if (!input.name) throw new Error('Name is required');
        if (!input.mins && Boolean(input.parentId)) throw new Error('Mins is required');
        return upsert(this.dedicatedTimeModel, {
            booth: input.boothId,
            parent: input.parentId,
            mins: input.mins,
            text: input.text,
            name: input.name,
        }, id);
    }

    async trackTime(input: TrackedTimeInput, id?: ID) {
        return upsert(this.trackedTimeModel, {
            dedicatedTime: input.dedicatedTimeId,
            mins: input.mins,
            text: input.text,
        }, id);
    }

    async removeTrackedTime(id: ID) {
        return del(this.trackedTimeModel, id)
    }

    async getTrackedTime(dedicatedTimeId: ID) {
        const trackedTimes = await this.trackedTimes(dedicatedTimeId);
        const totalMins = trackedTimes.reduce((acc, trackedTime) => acc + trackedTime.mins, 0);
        return totalMins;
    }

    async getTotalTime(dedicatedTimeId: ID) {
        const children = await this.dedicatedTimes(dedicatedTimeId) ?? [];
        const total = children.reduce((acc = 0, child: DedicatedTimeDocument) => {
            return acc + child.mins;
        });
        return total;
    }

    async getTotalTrackedTime(dedicatedTimeId: ID) {
        // Requires some refactoring/ rethinking. 
        const trackedTimes = aggregate(
            this.trackedTimeModel,
            {}
        )
        // await this.trackedTimes(dedicatedTimeId) ?? [];
        const total = trackedTimes.reduce((acc = 0, trackedTime: TrackedTimeDocument) => {
            return acc + trackedTime.mins;
        });
        return total;
    }

}