import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { EntriesService } from "./entries.service";

export type EntryInput = {
    boothId?: string;
    // parentId?: string;
    text?: string;
    name?: string;
}

export type GatewayInput = {
    boothId?: string;
    parentId?: string;
    text?: string;
    name?: string;
    entryId?: string;
}

@Resolver()
export class EntriesResolver {
    constructor(
        private readonly entrysService: EntriesService
    ) { }

    @Query()
    async entries(
        @Args('boothId') boothId?: string,
        // @Args('parentId') parentId?: string
    ) {
        return this.entrysService.entries(boothId);
    }
    @Query()
    async entry(
        @Args('id') id?: string,
    ) {
        return this.entrysService.entry(id);
    }


    @Mutation()
    async upsertEntry(
        @Args('input') input: EntryInput,
        @Args('id', { type: () => String }) id?: string
    ) {
        return this.entrysService.upsertEntry(input, id);
    }

    @Mutation()
    async stampRoadmap(
        @Args('id', { type: () => String }) id: string,
        @Args('key', { type: () => String }) key: string,
    ) {
        return this.entrysService.stampEntry(id, key);
    }

}