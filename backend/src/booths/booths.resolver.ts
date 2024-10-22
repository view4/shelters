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

    @Query(() => Booth)
    async booth(id: string): Promise<Booth> {
        return this.boothsService.booth(id);
    }

    @Mutation(() => Booth)
    async upsertBooth(
        @Args('input') input: BoothInput,
        @Args('id', {type: () => String}) id?: string
    ): Promise<Booth> {
        return this.boothsService.upsertBooth(input, id);
    }
}