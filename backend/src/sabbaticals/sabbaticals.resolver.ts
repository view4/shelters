import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { SabbaticalsService } from "./sabbaticals.service";

@Resolver()
export class SabbaticalsResolver {
  constructor(private readonly sabbaticalsService: SabbaticalsService) {}

  @Mutation(() => Boolean)
  async endSabbatical(
    @Args('startNewCycle') startNewCycle = true,   
  ) {
    return this.sabbaticalsService.completeCycle(startNewCycle);
  }
}