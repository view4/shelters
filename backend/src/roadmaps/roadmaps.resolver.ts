import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { RoadmapsService } from "./roadmaps.service";
import { GatewayDocument } from "./schema/gateway.schema";

export type RoadmapInput = {
    boothId?: string;
    parentId?: string;
    text?: string;
    name?: string;
}


@Resolver()
export class RoadmapsResolver {
    constructor(
        private readonly roadmapsService: RoadmapsService
    ) { }

    @Query()
    async roadmaps(
        @Args('boothId') boothId?: string,
        @Args('parentId') parentId?: string
    ) {
        return this.roadmapsService.roadmaps(boothId, parentId);
    }

    @Mutation()
    async upsertRoadmap(
        @Args('input') input: RoadmapInput,
        @Args('id', { type: () => String }) id?: string
    ) {
        return this.roadmapsService.upsertRoadmap(input, id);
    }

    @Mutation()
    async stampRoadmap(
        @Args('id', { type: () => String }) id: string,
        @Args('commenced', { type: () => Boolean }) commenced: boolean,
        @Args('completed', { type: () => Boolean }) completed: boolean
    ) {
        return this.roadmapsService.stampRoadmap(id, commenced, completed);
    }

    @ResolveField()
    async gateways(
        @Parent() parent: GatewayDocument
    ) {
        return this.roadmapsService.roadmaps(null, parent._id);
    }
}