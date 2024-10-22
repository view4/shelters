import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { TimetrackerService } from "./timetracker.service";
import { DedicatedTimeDocument } from "./schema/dedicated-time.schema";

export type DedicatedTimeInput = {
    boothId: string;
    parentId: string;
    mins: number;
    text: string;
    name: string;
}

export type TrackedTimeInput = {
    dedicatedTimeId: string;
    mins: number;
    text?: string;
}

@Resolver()
export class TimetrackerResolver {
    constructor(
        private readonly service: TimetrackerService,
    ) {}

    @Query()
    async trackedTimes(
        @Args('dedicatedTimeId', {type: () => String}) dedicatedTimeId?: string
    ) {
        return this.service.trackedTimes(dedicatedTimeId);
    }

    @Query()
    async dedicatedTimes(
        @Args('boothId', {type: () => String}) boothId?: string,
        @Args('parentId', {type: () => String}) parentId?: string
    ) {
        return this.service.dedicatedTimes(boothId, parentId);
    }
    
    @Mutation()
    async upsertDedicatedTime(
        @Args('input') input: DedicatedTimeInput,
        @Args('id', {type: () => String}) id?: string
    ) {
        return this.service.upsertDedicatedTime(input, id);
    }

    @Mutation()
    async trackTime(
        @Args('input') input: TrackedTimeInput,
    ) {
        return this.service.trackTime(input);
    }

    @ResolveField()
    async timeFulfilled(
        @Parent() parent: DedicatedTimeDocument
    ) {
        return this.service.getTimeFulfilled(parent._id);
    }

    @ResolveField()
    async children(
        @Parent() parent: DedicatedTimeDocument
    ) {
        return this.service.dedicatedTimes(null, parent._id);
    }
    
}