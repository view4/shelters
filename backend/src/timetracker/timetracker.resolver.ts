import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { TimetrackerService } from "./timetracker.service";

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
    ) { }

    @Query()
    async trackedTimes(
        @Args('dedicatedTimeId', { type: () => String }) dedicatedTimeId?: string
    ) {
        return this.service.trackedTimes(dedicatedTimeId);
    }

    @Query()
    async dedicatedTimes(
        @Args('boothId', { type: () => String }) boothId?: string,
        @Args('parentId', { type: () => String }) parentId?: string
    ) {
        const result = await this.service.dedicatedTimes(boothId, parentId);
        console.log("RESULT:")
        console.log(JSON.stringify(result))
        return result;
    }

    @Mutation()
    async upsertDedicatedTime(
        @Args('input') input: DedicatedTimeInput,
        @Args('id', { type: () => String }) id?: string
    ) {
        return this.service.upsertDedicatedTime(input, id);
    }

    @Mutation()
    async trackTime(
        @Args('input') input: TrackedTimeInput,
    ) {
        return this.service.trackTime(input);
    }

    // @ResolveField()
    // async trackedTime(
    //     @Parent() parent: DedicatedTimeDocument
    // ) {
    //     return this.service.getTrackedTime(parent._id);
    // }

    // @ResolveField()
    // async children(
    //     @Parent() parent: DedicatedTimeDocument
    // ) {
    //     return this.service.dedicatedTimes(null, parent._id);
    // }

    // @ResolveField()
    // async totalTime(
    //     @Parent() parent: DedicatedTimeDocument
    // ) {
    //     return this.service.getTotalTime(parent._id);
    // }

    // @ResolveField()
    // async totalTrackedTime(
    //     @Parent() parent: DedicatedTimeDocument
    // ) {
    //     return this.service.getTotalTrackedTime(parent._id);
    // }
}