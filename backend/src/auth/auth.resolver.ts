import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { SessionUser } from './decorators/session-user.decorator';

@Resolver('User')
export class AuthResolver {
  constructor(
    private service: AuthService,
  ) { }

  @Query()
  @UseGuards(AuthGuard)
  async me(
    @SessionUser() user
  ){
    return user
  }

}
