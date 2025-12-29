import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { EntriesService } from "./entries.service";
import { FeedParams } from "src/common/types";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { SessionUserT } from "src/auth/types/SessionUserType";
import { SessionUser } from "src/auth/decorators/session-user.decorator";

export type EntryInput = {
    boothId?: string;
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
        @Args('feedParams') feedParams?: FeedParams,
        @Args('boothId') boothId?: string,
        @Args('search') search?: string,
    ) {
        return this.entrysService.entries(boothId, search,feedParams);
    }
    @Query()
    async entry(
        @Args('id') id?: string,
    ) {
        return this.entrysService.entry(id);
    }


    @UseGuards(AuthGuard)
    @Mutation()
    async upsertEntry(
        @SessionUser() user: SessionUserT,
        @Args('input') input: EntryInput,
        @Args('id', { type: () => String }) id?: string
    ) {
        return this.entrysService.upsertEntry(user?.id, input, id);
    }

    @Mutation()
    async stampRoadmap(
        @Args('id', { type: () => String }) id: string,
        @Args('key', { type: () => String }) key: string,
    ) {
        return this.entrysService.stampEntry(id, key);
    }

}