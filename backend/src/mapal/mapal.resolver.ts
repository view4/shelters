import { Resolver, Query, Mutation, Args, ID, ResolveField, Parent } from '@nestjs/graphql';
import { MapalService } from './mapal.service';
import { Feature } from './schema/feature.schema';
import { FeatureVote } from './schema/feature-vote.schema';
import { FeatureComment } from './schema/feature-comment.schema';
import { MapalBooth } from './schema/mapal-booth.schema';
import { AuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { SessionUser } from 'src/auth/decorators/session-user.decorator';
import { SessionUserT } from 'src/auth/types/SessionUserType';
import { Booth } from 'src/booths/schema/booth.schema';
import { BoothInput } from 'src/booths/booths.resolver';
import { FeatureInput, FeatureVoteInput, FeatureCommentInput } from './schema/feature-inputs.schema';

@Resolver(() => Feature)
export class MapalResolver {
    constructor(private readonly mapalService: MapalService) { }

    // Feature queries and mutations
    @Query(() => [Feature])
    async features(@Args('boothId', { nullable: true }) boothId?: string) {
        return this.mapalService.features(boothId);
    }

    @Query(() => Feature)
    async feature(@Args('id', { type: () => ID }) id: string) {
        return this.mapalService.feature(id);
    }

    @Mutation(() => Feature)
    @UseGuards(AuthGuard)
    async upsertFeature(
        @SessionUser() user: SessionUserT,
        @Args('input') input: FeatureInput,
        @Args('id', { nullable: true }) id?: string,
    ) {
        return this.mapalService.upsertFeature(user?.id, input, id);
    }

    @Mutation(() => Feature)
    async stampFeature(
        @Args('id') id: string,
        @Args('key') key: string,
    ) {
        return this.mapalService.stampFeature(id, key);
    }

    @Query(() => [FeatureVote])
    async featureVotes(@Args('featureId', { type: () => ID }) featureId: string) {
        return this.mapalService.featureVotes(featureId);
    }

    @Mutation(() => FeatureVote)
    @UseGuards(AuthGuard)
    async upsertFeatureVote(
        @SessionUser() user: SessionUserT,
        @Args('input') input: FeatureVoteInput,
        @Args('id', { nullable: true }) id?: string,
    ) {
        return this.mapalService.upsertVote(user?.id, input, id);
    }

    @Query(() => [FeatureComment])
    async featureComments(@Args('featureId', { type: () => ID }) featureId: string) {
        return this.mapalService.featureComments(featureId);
    }

    @Mutation(() => FeatureComment)
    @UseGuards(AuthGuard)
    async upsertFeatureComment(
        @SessionUser() user: SessionUserT,
        @Args('input') input: FeatureCommentInput,
        @Args('id', { nullable: true }) id?: string,
    ) {
        return this.mapalService.upsertComment(user?.id, input, id);
    }

    @Mutation(() => Booth)
    @UseGuards(AuthGuard)
    async upsertMapalBooth(
        @SessionUser() user: SessionUserT,
        @Args('id', { nullable: true }) id: string,
        @Args('input') input: BoothInput
    ) {
        return this.mapalService.upsertMapalBooth(user?.id, input, id);
    }

    @ResolveField(() => ({key: String, value: String}), { nullable: true })
    async currentStamp(@Parent() feature: Feature) {
        if (!feature.stamps) return null;

        const stamps = Object.entries(feature.stamps ?? {})
            .filter(([_, value]) => value instanceof Date)
            .map(([key, value]) => ({ key,  value }));

        if (stamps.length === 0) return null;

        return stamps.reduce((latest, current) =>
            current.value > latest.value ? current : latest
        );
    }
} 