import { InputType, Field, ID } from '@nestjs/graphql';

export class FeatureStampsInput {
    @Field(() => Date, { nullable: true })
    prospective?: Date;
                
    @Field(() => Date, { nullable: true })
    committed?: Date;

    @Field(() => Date, { nullable: true })
    commenced?: Date;

    @Field(() => Date, { nullable: true })
    deployed?: Date;

    @Field(() => Date, { nullable: true })
    accepted?: Date;
}

@InputType()
export class FeatureInput {
    @Field()
    name: string;

    @Field()
    text: string;

    @Field()
    boothId: string;

    @Field(() => ID, { nullable: true })
    parent?: string;

    @Field(() => FeatureStampsInput, { nullable: true })
    stamps: FeatureStampsInput;
}

@InputType()
export class FeatureVoteInput {
    @Field()
    featureId: string;

    @Field()
    score: number;

    @Field()
    text: string;
}

@InputType()
export class FeatureCommentInput {
    @Field()
    featureId: string;

    @Field()
    text: string;
}

@InputType()
export class FeatureLabelInput {
    @Field()
    featureId: string;

    @Field(() => ID, { nullable: true })
    labelId?: string;

    @Field({ nullable: true })
    name?: string;
} 