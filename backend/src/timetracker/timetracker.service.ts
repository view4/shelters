import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DedicatedTime, DedicatedTimeDocument } from "./schema/dedicated-time.schema";
import mongoose, { Model } from "mongoose";
import { TrackedTime, TrackedTimeDocument } from "./schema/tracked-time.schema ";
import { BoothDedicatedTime, BoothDedicatedTimeDocument } from "./schema/booth-dedicated-time.schema";
import { TrackedDedicatedTime, TrackedDedicatedTimeDocument } from "./schema/tracked-dedicated-time.schema";
import { aggregate, aggregateFeed, connect, upsert, del, upsertOne } from "src/common/utils/db";
import { compactObject } from "src/common/utils/object";
import { DedicatedTimeInput, TrackedTimeInput } from "./timetracker.resolver";
import { ID } from "src/common/types";


@Injectable()
export class TimetrackerService {
    constructor(
        @InjectModel(DedicatedTime.name) private dedicatedTimeModel: Model<DedicatedTimeDocument>,
        @InjectModel(TrackedTime.name) private trackedTimeModel: Model<TrackedTimeDocument>,
        @InjectModel(BoothDedicatedTime.name) private boothDedicatedTimeModel: Model<BoothDedicatedTimeDocument>,
        @InjectModel(TrackedDedicatedTime.name) private trackedDedicatedTimeModel: Model<TrackedDedicatedTimeDocument>,
    ) { }

    async dedicatedTimes(
        boothId?: ID,
        parentId?: ID,
        feedParams?: any
    ) {
        const pipeline = boothId ? [...this.pipeline, { $match: { 'booths.booth': new mongoose.Types.ObjectId(boothId) } }] : this.pipeline;
        return aggregateFeed(
            this.dedicatedTimeModel,
            {
                match: compactObject({
                    ...feedParams?.match,
                    parent: parentId ? new mongoose.Types.ObjectId(parentId) : {
                        $exists: false
                    },
                }),
                sort: { createdAt: -1 }
            },
            pipeline
        );
    }

    pipeline = [
        // Lookup booth connections
        {
            $lookup: {
                from: "boothdedicatedtimes",
                localField: "_id",
                foreignField: "dedicatedTime",
                as: "booths"
            }
        },
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
            {},
            [
                {
                    $lookup: {
                        from: "trackeddedicatedtimes",
                        localField: "_id",
                        foreignField: "trackedTime",
                        as: "dedicatedTimes"
                    }
                },
                {
                    $match: {
                        'dedicatedTimes.dedicatedTime': new mongoose.Types.ObjectId(dedicatedTimeId)
                    }
                }
            ]
        )
    }

    async connectDedicatedTimeToBooth(dedicatedTimeId: ID, boothId: ID) {
        if (!boothId) return;
        const connection = {
            booth: new mongoose.Types.ObjectId(boothId),
            dedicatedTime: new mongoose.Types.ObjectId(dedicatedTimeId)
        }
        await upsertOne(this.boothDedicatedTimeModel, connection, connection);
    }

    async dedicateTime(input: DedicatedTimeInput, id?: ID) {
        if (id && input && !input.mins && !input.name && input.boothId) {
             await this.connectDedicatedTimeToBooth(id, input.boothId)
             return {id}
            }
        if (!input.name) throw new Error('Name is required');
        if (!input.mins && Boolean(input.parentId)) throw new Error('Mins is required');
        // Create or update the DedicatedTime without booth field
        const dedicatedTime = await upsert(this.dedicatedTimeModel, {
            parent: input.parentId,
            mins: input.mins,
            text: input.text,
            name: input.name,
        }, id);

        await this.connectDedicatedTimeToBooth(dedicatedTime._id, input.boothId);

        return dedicatedTime;

    }

    async connectTrackedTimeToDedicatedTime(trackedTimeId: ID, dedicatedTimeId: ID) {
        if (!dedicatedTimeId) return;
        const connection = {
            trackedTime: new mongoose.Types.ObjectId(trackedTimeId),
            dedicatedTime: new mongoose.Types.ObjectId(dedicatedTimeId)
        }
        await upsertOne(this.trackedDedicatedTimeModel, connection, connection);
    }

    async trackTime(input: TrackedTimeInput, id?: ID) {
        if (id && input && !input.mins && !input.text && input.dedicatedTimeId) {
            await this.connectTrackedTimeToDedicatedTime(id, input.dedicatedTimeId);
            return {id}
        }

        // Create or update the TrackedTime without dedicatedTime field
        const trackedTime = await upsert(this.trackedTimeModel, {
            mins: input.mins,
            text: input.text,
        }, id);

        await this.connectTrackedTimeToDedicatedTime(trackedTime._id, input.dedicatedTimeId);

        return trackedTime;
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