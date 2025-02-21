import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
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
    private  boothService: BoothsService
  ) {
    const env = this.configService.get<string>('ENV');
    this.isDevelopment = env === 'development' || env === 'local';
  }

  async hasValidMembership(userId: ID) {
    return filterOne(
      this.membershipModel,
      {
        userId,
        "stamos.commmenced": { $ne: null },
        "stamps.completed": { $eq: null }
      }
    )
  }

async setMembership(userId: ID, data) {
  return upsertOne(this.membershipModel, data, { userId });
}

  

}
