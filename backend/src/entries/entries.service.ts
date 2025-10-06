import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import mongoose, { Model } from "mongoose";
import { aggregateFeed, connect, upsert } from "src/common/utils/db";
import { compactObject } from "src/common/utils/object";
import { FeedParams, ID } from "src/common/types";
import { Entry, EntryDocument } from "./schema/entry.schema";
import { EntryInput } from "./entries.resolver";

@Injectable()
export class EntriesService {
    constructor(
        @InjectModel(Entry.name) private entryModel: Model<EntryDocument>
    ) { }

    async entries(boothId?: ID, search?: string, feedParams?: FeedParams) {
        const match = compactObject({
            $or: Boolean(search) ? [
                { name: { $regex: search, $options: "i" } },
                { text: { $regex: search, $options: "i" } }
            ] : null
        })
        match['booth'] = boothId ? new mongoose.Types.ObjectId(boothId) : null;
        return this.aggregateFeed(
            {
                match: match,
                ...feedParams
            }
        )
    };

    async aggregateFeed(feedParams: FeedParams, pipeline = []) {
        const p = [
            connect(
                "gateways",
                "_id",
                "entry",
                "gateways",
                [
                    {
                        "$addFields": {
                            id: "$_id",
                        }
                    }
                ]
            ),
            connect(
                "entrys",
                "_id",
                "parent",
                "children",
                [
                    {
                        "$addFields": {
                            id: "$_id",
                        }
                    }
                ]
            ),
            ...pipeline
        ]
        feedParams.sort = { createdAt: -1 }
        return aggregateFeed(this.entryModel, feedParams, p);
    }

    async entry(id: ID) {
        const result = await this.aggregateFeed({ limit: 1, match: { _id: new mongoose.Types.ObjectId(id) } });
        return result.entities[0];
    }


    async upsertEntry(input: EntryInput, id?: ID) {
        return upsert(this.entryModel, {
            booth: input.boothId,
            text: input.text,
            name: input.name,
            // parent: input.parentId,
        }, id);
    }

    async stampEntry(id: ID, key: string) {
        return upsert(this.entryModel, compactObject({
            [`stamps.${key}`]: new Date(),
        }), id);
    }
}