import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DedicatedTime, DedicatedTimeDocument } from "./schema/dedicated-time.schema";
import mongoose, { Model } from "mongoose";
import { TrackedTime, TrackedTimeDocument } from "./schema/tracked-time.schema ";
import { aggregateFeed, filter, upsert } from "src/common/utils/db";
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
        parentId?: ID
    ) {
        return aggregateFeed(
            this.dedicatedTimeModel,
            {
                match: compactObject({ 
                    booth: boothId && new mongoose.Types.ObjectId(boothId), 
                    parent: parentId && new mongoose.Types.ObjectId(parentId)
                }),
            },
        );
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
        return upsert(this.dedicatedTimeModel, {
            booth: input.boothId,
            parent: input.parentId,
            mins: input.mins,
            text: input.text,
            name: input.name,
        }, id);
    }

    async trackTime(input: TrackedTimeInput) {
        return upsert(this.trackedTimeModel, {
            dedicatedTime: input.dedicatedTimeId,
            mins: input.mins,
            text: input.text,
        });
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
        const trackedTimes = await this.trackedTimes(dedicatedTimeId) ?? [];
        const total = trackedTimes.reduce((acc = 0, trackedTime: TrackedTimeDocument) => {
            return acc + trackedTime.mins;
        });
        return total;
    }

}