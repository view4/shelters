import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { SabbaticalsService } from "./sabbaticals.service";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { SessionUser } from "src/auth/decorators/session-user.decorator";
import { SessionUserT } from "src/auth/types/SessionUserType";

@Resolver()
export class SabbaticalsResolver {
  constructor(private readonly sabbaticalsService: SabbaticalsService) { }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async endSabbatical(
    @SessionUser() user: SessionUserT,
    @Args('startNewCycle') startNewCycle = true,
  ) {
    return this.sabbaticalsService.completeCycle(user.id, startNewCycle);
  }
}