import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver('User')
export class AuthResolver {
  constructor(
    private service: AuthService,
  ) { }

}
