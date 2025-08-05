import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MalchutBooth } from './schema/malchut-booth.schema';
import { Directive } from './schema/directive.schema';
import { DirectiveComment } from './schema/directive-comment.schema';
import { DirectiveVote } from './schema/directive-vote.schema';
import { BoothsService } from 'src/booths/booths.service';
import { BoothInput } from 'src/booths/booths.resolver';
import { ID } from 'src/common/types';
import { aggregate, aggregateFeed, filter, filterOne, upsert, upsertOne } from 'src/common/utils/db';
import mongoose from 'mongoose';
import { CommentsService } from 'src/entries/comments.service';
import { VoteService } from 'src/common/vote.service';
import { Vote } from 'src/common/schemas/vote.schema';
import { DirectiveInput } from './schema/directive-inputs.schema';

@Injectable()
export class MalchutService {
  constructor(
    @InjectModel(MalchutBooth.name) private malchutBoothModel: Model<MalchutBooth>,
    @InjectModel(Directive.name) private directiveModel: Model<Directive>,
    @InjectModel(DirectiveComment.name) private directiveCommentModel: Model<DirectiveComment>,
    @InjectModel(DirectiveVote.name) private directiveVoteModel: Model<DirectiveVote>,
    private boothsService: BoothsService,
    private commentsService: CommentsService,
    private voteService: VoteService,
  ) { }

  // Directive methods
  async upsertDirective(userId: ID, input: DirectiveInput, id?: string): Promise<Directive> {
    const data = { ...input, booth: input.boothId, parent: input.parentId, user: userId };
    return upsert(this.directiveModel, data, id);
  }

  async directives(boothId?: string, feedParams?: any) {
    const match = boothId ? { booth: new mongoose.Types.ObjectId(boothId) } : {};
    return aggregateFeed(
      this.directiveModel,
      feedParams,
      [
        { $match: match },
        {
          $lookup: {
            from: 'directivecomments',
            localField: '_id',
            foreignField: 'directive',
            as: 'directiveComments'
          }
        },
        {
          $lookup: {
            from: 'comments',
            localField: 'directiveComments.comment',
            foreignField: '_id',
            as: 'comments',
            pipeline: [
              {
                $addFields: {
                  id: '$_id',
                }
              }
            ]
          }
        },
        {
          $lookup: {
            from: 'directivevotes',
            localField: '_id',
            foreignField: 'directive',
            as: 'directiveVotes',
            pipeline: [
              {
                $lookup: {
                  from: 'votes',
                  localField: 'vote',
                  foreignField: '_id',
                  as: 'voteData'
                }
              },
              { $unwind: '$voteData' },
              {
                $addFields: {
                  id: '$_id',
                  directiveId: '$directive',
                  text: '$voteData.text',
                  score: '$voteData.score',
                  user: '$voteData.user',
                  createdAt: '$createdAt',
                  updatedAt: '$updatedAt'
                }
              }
            ]
          }
        },
        {
          $lookup: {
            from: 'directives',
            localField: '_id',
            foreignField: 'parent',
            as: 'children',
            pipeline: [
              {
                $addFields: {
                  id: '$_id',
                  boothId: '$booth'
                }
              }
            ]
          }
        },
        {
          $addFields: {
            id: '$_id',
            boothId: '$booth',
            votes: '$directiveVotes',
            totalComments: {
              $size: '$comments'
            },
            totalVotes: {
              $reduce: {
                input: '$directiveVotes',
                initialValue: 0,
                in: { $add: ['$$value', '$$this.score'] }
              }
            }
          }
        }
      ]
    );
  }

  async directive(id: ID): Promise<Directive> {
    const [directive] = await aggregate(this.directiveModel, [
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      { $limit: 1 },
      {
        $lookup: {
          from: 'directivecomments',
          localField: '_id',
          foreignField: 'directive',
          as: 'directiveComments'
        }
      },
      {
        $lookup: {
          from: 'comments',
          localField: 'directiveComments.comment',
          foreignField: '_id',
          as: 'comments',
          pipeline: [
            {
              $addFields: {
                id: '$_id',
              }
            }
          ]
        }
      },
      {
        $lookup: {
          from: 'directivevotes',
          localField: '_id',
          foreignField: 'directive',
          as: 'directiveVotes',
          pipeline: [
            {
              $lookup: {
                from: 'votes',
                localField: 'vote',
                foreignField: '_id',
                as: 'voteData'
              }
            },
            { $unwind: '$voteData' },
            {
              $addFields: {
                id: '$_id',
                directiveId: '$directive',
                text: '$voteData.text',
                score: '$voteData.score',
                user: '$voteData.user',
                createdAt: '$createdAt',
                updatedAt: '$updatedAt'
              }
            }
          ]
        }
      },
      {
        $lookup: {
          from: 'directives',
          localField: '_id',
          foreignField: 'parent',
          as: 'children',
          pipeline: [
            {
              $addFields: {
                id: '$_id',
                boothId: '$booth'
              }
            }
          ]
        }
      },
      {
        $addFields: {
          id: '$_id',
          boothId: '$booth',
          votes: '$directiveVotes',
          totalComments: {
            $size: '$comments'
          },
          totalVotes: {
            $reduce: {
              input: '$directiveVotes',
              initialValue: 0,
              in: { $add: ['$$value', '$$this.score'] }
            }
          }
        }
      }
    ]);
    return directive;
  }

  // DirectiveComment methods
  async upsertDirectiveComment(
    userId: ID,
    input: any,
    id?: string,
  ) {
    // First create/update the base comment
    const comment = await this.commentsService.upsertComment(
      userId,
      { text: input.text },
      id,
    );
    return upsertOne(this.directiveCommentModel, {
      directive: input.directiveId,
      comment: comment._id,
    }, {
      directive: input.directiveId,
      comment: comment._id,
    });
  }

  // DirectiveVote methods
  async upsertDirectiveVote(userId: ID, input: any, id?: string): Promise<any> {
    // First, create or update the vote
    const vote = await this.voteService.upsert(userId, {
      text: input.text,
      score: input.score
    }, id);

    const directiveVote = await upsert(this.directiveVoteModel, {
      directive: input.directiveId,
      vote: vote._id
    });

    // Return combined data for the resolver
    return {
      ...vote.toObject(),
      createdAt: directiveVote.createdAt,
      updatedAt: directiveVote.updatedAt
    };
  }

  async directiveVotes(directiveId: string): Promise<DirectiveVote[]> {
    return filter(this.directiveVoteModel, { directive: directiveId });
  }

  // MalchutBooth methods
  async upsertMalchutBooth(userId: ID, input: BoothInput, id?: string): Promise<any> {
    // First upsert the booth
    const booth = await this.boothsService.upsertBooth(userId, input, id);
    if (id) return booth;

    const malchutBooth = await upsert(this.malchutBoothModel, {
      booth: booth._id,
    });

    return { ...booth.toObject(), id: booth._id, malchutBoothId: malchutBooth._id };
  }
} 