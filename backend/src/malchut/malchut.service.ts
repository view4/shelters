import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MalchutBooth } from './schema/malchut-booth.schema';
import { Directive } from './schema/directive.schema';
import { DirectiveComment } from './schema/directive-comment.schema';
import { BoothsService } from 'src/booths/booths.service';
import { BoothInput } from 'src/booths/booths.resolver';
import { ID } from 'src/common/types';
import { aggregate, aggregateFeed, filter, filterOne, upsert, upsertOne } from 'src/common/utils/db';
import mongoose from 'mongoose';
import { CommentsService } from 'src/entries/comments.service';

@Injectable()
export class MalchutService {
  constructor(
    @InjectModel(MalchutBooth.name) private malchutBoothModel: Model<MalchutBooth>,
    @InjectModel(Directive.name) private directiveModel: Model<Directive>,
    @InjectModel(DirectiveComment.name) private directiveCommentModel: Model<DirectiveComment>,
    private boothsService: BoothsService,
    private commentsService: CommentsService,
  ) { }

  // Directive methods
  async upsertDirective(userId: ID, input: any, id?: string): Promise<Directive> {
    const data = { ...input, booth: input.boothId, user: userId };
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
          $addFields: {
            id: '$_id',
            boothId: '$booth',
            totalComments: {
              $size: '$comments'
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
          from: 'directives',
          localField: '_id',
          foreignField: 'parent',
          as: 'children'
        }
      },
      {
        $addFields: {
          id: '$_id',
          boothId: '$booth',
          totalComments: {
            $size: '$comments'
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