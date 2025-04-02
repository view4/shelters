import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ScheduledTimeService } from "./scheduled-time.service";
import { FeedParams } from "src/common/types";

export type ScheduledTimeInput = {
    boothId: string;
    start: Date;
    end: Date;
    text: string;
    name: string;
}

@Resolver()
export class ScheduledTimeResolver {
    constructor(
        private readonly service: ScheduledTimeService,
    ) { }

    @Query()
    async scheduledTimes(
        @Args('boothId', { type: () => String }) boothId?: string,
        @Args('feedParams', { type: () => Object, nullable: true }) feedParams?: FeedParams,
        @Args('start', { type: () => Date, nullable: true }) start?: Date,
        @Args('end', { type: () => Date, nullable: true }) end?: Date

    ) {
        return this.service.scheduledTimes(boothId, start, end, feedParams);
    }

    @Mutation()
    async upsertScheduledTime(
        @Args('input') input: ScheduledTimeInput,
        @Args('id', { type: () => String }) id?: string
    ) {
        return this.service.upsertScheduledTime(input, id);
    }

    @Mutation()
    async removeScheduledTime(
        @Args('id', { type: () => String }) id: string
    ) {
        await this.service.removeScheduledTime(id);
        return true;
    }
}