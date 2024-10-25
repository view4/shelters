import { Args, Field, InputType, Mutation, Query, Resolver } from "@nestjs/graphql";
import { BoothsService } from "./booths.service";
import { Booth } from "./schema/booth.schema";

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

    @Query(() => [Booth])
    async booths(): Promise<Booth[]> {
        return this.boothsService.booths();
    }

    @Query(() => [Booth])
    async activeBooth(): Promise<Booth[]> {
        return this.boothsService.activeBooth();
    }

    @Query(() => Booth)
    async booth(
        @Args('id', {type: () => String}) id: string
    ): Promise<Booth> {
        return this.boothsService.booth(id);
    }

    @Mutation(() => Booth)
    async upsertBooth(
        @Args('input') input: BoothInput,
        @Args('id', {type: () => String}) id?: string
    ): Promise<Booth> {
        return this.boothsService.upsertBooth(input, id);
    }

    @Mutation(() => Booth)
    stampBooth(
        @Args('id', {type: () => String}) id: string,
        @Args('key', {type: () => String, nullable: true}) key,
    ): Promise<Booth> {
        return this.boothsService.stampBooth(id, key);
    }
}