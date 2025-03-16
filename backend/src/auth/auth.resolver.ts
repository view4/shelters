import { Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { SessionUser } from './decorators/session-user.decorator';
import { SessionUserT } from './types/SessionUserType';
import { MembershipService } from './membership.service';

@Resolver('User')
export class AuthResolver {
  constructor(
    private service: AuthService,
    private membershipService: MembershipService
  ) { }

  @Query()
  @UseGuards(AuthGuard)
  async user(
    @SessionUser() user: SessionUserT
  ) {
    return user
  }

  @ResolveField()
  @UseGuards(AuthGuard)
  async membership(
    @SessionUser() user: SessionUserT,
  ) {
    return this.membershipService.membership(user.id, { includeIsActive: true })
  }

  @ResolveField()
  @UseGuards(AuthGuard)
  async boothCount(
    @SessionUser() user: SessionUserT
  ) {
    return this.membershipService.boothCount(user.id)
  }

}
