import mongoose, { Model } from 'mongoose';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { ConfigService } from '@nestjs/config';
import { filterOne, upsertOne } from 'src/common/utils/db';
import { ID } from 'src/common/types';
import { Membership } from './schemas/membership.schema';
import { BoothsService } from 'src/booths/booths.service';

@Injectable()
export class MembershipService {
  isDevelopment: boolean;
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Membership.name) private membershipModel: Model<Membership>,
    private configService: ConfigService,
    @Inject(forwardRef(() => BoothsService)) private boothService: BoothsService
  ) {
    const env = this.configService.get<string>('ENV');
    this.isDevelopment = env === 'development' || env === 'local';
  }

  async hasValidMembership(userId: ID) {
    return filterOne(
      this.membershipModel,
      {
        user: new mongoose.Types.ObjectId(userId),
        "stamps.commenced": { $ne: null },
        "stamps.completed": { $eq: null }
      }
    )
  }

  async setMembership(userId: ID, data) {
    return upsertOne(this.membershipModel, data, { user: new mongoose.Types.ObjectId(userId) });
  }

  async membership(userId: ID, { includeIsActive = false } = {}) {
    const membership = await filterOne(this.membershipModel, { user: userId });
    if (includeIsActive) {
      return ({
        isActive: Boolean(membership?.stamps?.commenced ) && !membership?.stamps?.completed,
        user: membership?.user,
        stamps: membership?.stamps,
        createdAt: membership?.createdAt,
        updatedAt: membership?.updatedAt,
        id: membership?.id
      })
    }
    return membership;
  }

  async boothCount(userId: ID) {
    return this.boothService.boothCount({ user: userId });
  }

}
