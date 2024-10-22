import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CyclesService } from "./cycles.service";


export type CycleInput = {
    name?: string;
    text?: string;
    a?: string;
    b?: string;
    c?: string;
    d?: string;
    e?: string;
    f?: string;
    sabbatical?: string;
}

@Resolver()
export class CyclesResolver {
    constructor(
        private readonly cyclesService: CyclesService
    ) {}

    @Query()
    async cycles(@Args('boothId') boothId: string) {
        return this.cyclesService.cycles(boothId);
    }

    @Query()
    async currentCycle(@Args('boothId') boothId: string) {
        return this.cyclesService.currentCycle(boothId);
    }

    @Mutation()
    async completeCycle(@Args('id') id: string) {
        return this.cyclesService.completeCycle(id);
    }

    @Mutation()
    async upsertCycle(
        @Args('input') input: CycleInput,
        @Args('id', {type: () => String}) id?: string
    ) {
        return this.cyclesService.upsertCycle(input, id);
    }
}