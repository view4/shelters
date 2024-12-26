import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CyclesService } from "./cycles.service";
import { ID } from "src/common/types";


export type CycleInput = {
    name?: string;
    text?: string;
    a?: ID;
    b?: ID;
    c?: ID;
    d?: ID;
    e?: ID;
    f?: ID;
    sabbatical?: ID;
    boothId?: ID;
    activateCycle?: boolean;
}

@Resolver()
export class CyclesResolver {
    constructor(
        private readonly cyclesService: CyclesService
    ) { }

    @Query()
    async cycles(@Args('boothId') boothId: string) {
        return this.cyclesService.cycles(boothId);
    }

    @Query()
    async currentCycle(@Args('boothId') boothId: string) {
        const res = await  this.cyclesService.currentCycle(boothId);
        console.log(JSON.stringify(res))
        return res
    }

    @Mutation()
    async completeCycle(@Args('id') id: string) {
        return this.cyclesService.completeCycle(id);
    }

    @Mutation()
    async upsertCycle(
        @Args('input') input: CycleInput,
        @Args('id', { type: () => String }) id?: string
    ) {
        return this.cyclesService.upsertCycle(input, id);
    }
}