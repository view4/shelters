import { Args, Field, InputType, Mutation, Query, Resolver } from "@nestjs/graphql";
import { BoothsService } from "./booths.service";
import { Booth } from "./schema/booth.schema";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { SessionUser } from "src/auth/decorators/session-user.decorator";
import { SessionUserT } from "src/auth/types/SessionUserType";

@InputType()
export class BoothInput{
    @Field()
    name: string;

    @Field()
    text: string;
};

@Resolver(() => Booth)
export class BoothsResolver {
    constructor(private readonly boothsService: BoothsService) { }

    @UseGuards(AuthGuard)
    @Query(() => [Booth])
    async booths(@SessionUser() user: SessionUserT): Promise<Booth[]> {
        return this.boothsService.booths(user?.id);
    }

    @UseGuards(AuthGuard)
    @Query(() => [Booth])
    async activeBooth(@SessionUser() user: SessionUserT): Promise<Booth[]> {
        return this.boothsService.activeBooth(user?.id);
    }

    @UseGuards(AuthGuard)
    @Query(() => Booth)
    async booth(
        @SessionUser() user: SessionUserT,
        @Args('id', {type: () => String}) id: string
    ): Promise<Booth> {
        return this.boothsService.booth(user?.id, id);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => Booth)
    async upsertBooth(
        @SessionUser() user: SessionUserT,
        @Args('input') input: BoothInput,
        @Args('id', {type: () => String}) id?: string
    ): Promise<Booth> {
        return this.boothsService.upsertBooth(user?.id, input, id);
    }

    @UseGuards(AuthGuard)
    @Mutation(() => Booth)
    stampBooth(
        @Args('id', {type: () => String}) id: string,
        @Args('key', {type: () => String, nullable: true}) key,
    ): Promise<Booth> {
        return this.boothsService.stampBooth(id, key);
    }

    @Mutation(() => Booth)
    assignBoothToUser(
        @Args('boothId', {type: () => String}) boothId: string,
        @Args('userId', {type: () => String}) userId: string
    ): Promise<Booth> {
        return this.boothsService.assignBoothToUser(boothId, userId);
    }
}