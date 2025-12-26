import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { ROLES } from 'src/auth/schemas/const';
import { aggregateFeed, filter, filterOne, upsertOne } from 'src/common/utils/db';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async initAdmin(email: string): Promise<User | null> {
    const user = await filterOne(this.userModel, { email });
    
    if (!user) return null;

    if (user.roles && user.roles.includes(ROLES.ADMIN)) return user;

    const roles = user.roles ? [...user.roles, ROLES.ADMIN] : [ROLES.ADMIN];
    return upsertOne(this.userModel, { roles }, { email });
  }

  async removeAdminRoleByEmail(email: string): Promise<User | null> {
    const user = await filterOne(this.userModel, { email });
    
    if (!user) return null;

    const roles = user.roles ? user.roles.filter(role => role !== ROLES.ADMIN) : [];
    return upsertOne(this.userModel, { roles }, { email });
  }

  async listAdmins(): Promise<User[] | null> {
    return filter(this.userModel, { roles: ROLES.ADMIN });
  }

  async users(): Promise<User[] | null> {
    return aggregateFeed(this.userModel, {
      sort: { createdAt: -1 },
    });
  }
}

