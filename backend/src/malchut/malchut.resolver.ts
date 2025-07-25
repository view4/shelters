import { Resolver, Query, Mutation, Args, ID, ResolveField, Parent } from '@nestjs/graphql';
import { MalchutService } from './malchut.service';
import { Directive } from './schema/directive.schema';
import { DirectiveComment } from './schema/directive-comment.schema';
import { AuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { SessionUser } from 'src/auth/decorators/session-user.decorator';
import { SessionUserT } from 'src/auth/types/SessionUserType';
import { Booth } from 'src/booths/schema/booth.schema';
import { BoothInput } from 'src/booths/booths.resolver';

@Resolver(() => Directive)
export class MalchutResolver {
  constructor(private readonly malchutService: MalchutService) {}

  @Query(() => Directive)
  @UseGuards(AuthGuard)
  async directive(
    @SessionUser() user: SessionUserT,
    @Args('id', { type: () => ID }) id: string,
  ) {
    return this.malchutService.directive(id);
  }

  @Query(() => [Directive])
  @UseGuards(AuthGuard)
  async directives(
    @SessionUser() user: SessionUserT,
    @Args('boothId', { type: () => String }) boothId: string,
    @Args('feedParams', { nullable: true }) feedParams?: any,
  ) {
    return this.malchutService.directives(boothId, feedParams);
  }

  @Mutation(() => Directive)
  @UseGuards(AuthGuard)
  async upsertDirective(
    @SessionUser() user: SessionUserT,
    @Args('input') input: any,
    @Args('id', { nullable: true }) id?: string,
  ) {
    return this.malchutService.upsertDirective(user?.id, input, id);
  }

  @Mutation(() => DirectiveComment)
  @UseGuards(AuthGuard)
  async upsertDirectiveComment(
    @SessionUser() user: SessionUserT,
    @Args('input') input: any,
    @Args('id', { nullable: true }) id?: string,
  ) {
    return this.malchutService.upsertDirectiveComment(user?.id, input, id);
  }

  @Mutation(() => Booth)
  @UseGuards(AuthGuard)
  async upsertMalchutBooth(
    @SessionUser() user: SessionUserT,
    @Args('id', { nullable: true }) id: string,
    @Args('input') input: BoothInput,
  ) {
    return this.malchutService.upsertMalchutBooth(user?.id, input, id);
  }
} 