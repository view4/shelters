import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { aggregateFeed, upsert, del } from "src/common/utils/db";
import { compactObject } from "src/common/utils/object";
import { ID } from "src/common/types";
import { ScheduledTime, ScheduledTimeDocument } from "./schema/scheduled-time.schema";
import { ScheduledTimeInput } from "./scheduled-time.resolver";


@Injectable()
export class ScheduledTimeService {
    constructor(
        @InjectModel(ScheduledTime.name) private scheduledTimeModel: Model<ScheduledTimeDocument>,
    ) { }

    async scheduledTimes(
        boothId?: ID,
        start?: Date,
        end?: Date,
        feedParams?: any
    ) {
        const res = await aggregateFeed(
            this.scheduledTimeModel,
            {
                match: compactObject({
                    ...feedParams?.match,
                    booth: boothId && new mongoose.Types.ObjectId(boothId),
                    ...(start && { start: { $gte: start } }),
                    ...(end && { end: { $lte: end } }),
                }),
                sort: { createdAt: -1 }
            },
            this.pipeline
        );
        console.log(res);
        return res
    }

    pipeline = []


    async upsertScheduledTime(input: ScheduledTimeInput, id?: string) {
        if (!input.name) throw new Error('Name is required');
        if (!input.start && !input.end) throw new Error('Either Start  or End time is required');
        return upsert(this.scheduledTimeModel, {
            booth: input.boothId,
            text: input.text,
            name: input.name,
            start: input.start,
            end: input.end,
        }, id);
    }

    async removeScheduledTime(id: ID) {
        return del(this.scheduledTimeModel, id)
    }


}