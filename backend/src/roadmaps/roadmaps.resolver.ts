import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { RoadmapsService } from "./roadmaps.service";

export type RoadmapInput = {
    boothId?: string;
    parentId?: string;
    text?: string;
    name?: string;
}

export type GatewayInput = {
    boothId?: string;
    parentId?: string;
    text?: string;
    name?: string;
    roadmapId?: string;
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
    @Query()
    async roadmap(
        @Args('id') id?: string,
    ) {
        return this.roadmapsService.roadmap(id);
    }

    @Query()
    async gateways(
        @Args('boothId') boothId?: string,
        @Args('parentId') parentId?: string,
        @Args('gatewayId') gatewayId?: string
    ) {
        return this.roadmapsService.gateways(boothId, parentId, gatewayId);
    }

    @Mutation()
    async upsertGateway(
        @Args('input') input: GatewayInput,
        @Args('id', { type: () => String }) id?: string
    ) {
        return this.roadmapsService.upsertGateway(input, id);
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
        @Args('key', { type: () => String }) key: string,
    ) {
        return this.roadmapsService.stampRoadmap(id, key);
    }

    @Mutation()
    async stampGateway(
        @Args('id', { type: () => String }) id: string,
        @Args('key', { type: () => String }) key: string,
    ) {
        return this.roadmapsService.stampGateway(id, key);
    }

    // @ResolveField()
    // async gateways(
    //     @Parent() parent: GatewayDocument
    // ) {
    //     return this.roadmapsService.roadmaps(null, parent._id);
    // }
}