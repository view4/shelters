import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DirectiveInput {
    @Field()
    name: string;

    @Field()
    text: string;

    @Field()
    boothId: string;

    @Field({ nullable: true })
    parentId?: string;
}

@InputType()
export class DirectiveCommentInput {
    @Field()
    directiveId: string;

    @Field()
    text: string;
}

@InputType()
export class DirectiveVoteInput {
    @Field()
    directiveId: string;

    @Field()
    text: string;

    @Field()
    score: number;
}