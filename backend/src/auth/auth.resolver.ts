import { Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { SessionUser } from './decorators/session-user.decorator';
import { SessionUserT } from './types/SessionUserType';

@Resolver('User')
export class AuthResolver {
  constructor(
    private service: AuthService,
  ) { }

  @Query()
  @UseGuards(AuthGuard)
  async user(
    @SessionUser() user: SessionUserT
  ){
    return user
  }

}
