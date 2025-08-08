import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vote } from './schemas/vote.schema';
import { fetchOne, upsert } from './utils/db';
import { ID } from './types';

export interface VoteInput {
    text: string;
    score: number;
}

@Injectable()
export class VoteService {
    constructor(
        @InjectModel(Vote.name) private voteModel: Model<Vote>,
    ) { }

    async upsert(userId: ID, input: VoteInput, id?: string): Promise<Vote> {
        return upsert(this.voteModel, { ...input, user: userId }, id);
    }

    async getVote(id: string): Promise<Vote> {
        return fetchOne(this.voteModel, id);
    }
}