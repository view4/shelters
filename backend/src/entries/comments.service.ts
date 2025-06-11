import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './schema/comment.schema';
import { ID } from 'src/common/types';
import { del, upsert } from 'src/common/utils/db';

// TODO: judge 
// 
// whether having multiple connecting tables is correct
//
// OR
//  
// having resource name/type and resource ID on the table is better 


// OR - having schema for comments or somethig, 

// AND SAME applies with different variations of booths basically...
@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  async upsertComment(userId: ID, input: any, id?: string): Promise<Comment> {
    return upsert(this.commentModel, { ...input, user: userId }, id);
  }

  async removeComment(id: ID): Promise<Comment> {
    return del(this.commentModel, id);
  }
} 