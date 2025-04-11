import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CyclesService } from "./cycles.service";
import { ID } from "src/common/types";
import { SessionUser } from "src/auth/decorators/session-user.decorator";
import { AuthGuard } from "src/auth/auth.guard";
import { UseGuards } from "@nestjs/common";
import { Session } from "inspector/promises";
import { SessionUserT } from "src/auth/types/SessionUserType";


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
    async cycles(
        @Args('boothId') boothId: string,
        @Args('isCompleted') isCompleted?: boolean,
        @Args('isForthcoming') isForthcoming?: boolean
    ) {
        return this.cyclesService.cycles({
            boothId,
            isCompleted,
            isForthcoming
        });
    }

    @UseGuards(AuthGuard)
    @Query()
    async currentCycle(
        @SessionUser() user: SessionUserT,
        @Args('boothId') boothId: string
    ) {
        return this.cyclesService.currentCycle(user?.id, boothId);
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

    @UseGuards(AuthGuard)
    @Mutation()
    async addGatewayToCycle(
        @SessionUser() user: SessionUserT,
        @Args('gatewayId') gatewayId: string
    ) {
        return this.cyclesService.addGatewayToCycle(user.id, gatewayId);
    }

    @UseGuards(AuthGuard)
    @Mutation()
    async focusCycle(
        @SessionUser() user: SessionUserT,
        @Args('id') id: string
    ) {
        return  this.cyclesService.focusCycle(id);
    }
}