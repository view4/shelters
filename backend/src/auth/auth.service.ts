import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { ConfigService } from '@nestjs/config';
import { FirebaseService } from './submodules/firebase/firebase.service';
import { filterOne, upsertOne } from 'src/common/utils/db';

@Injectable()
export class AuthService {
  isDevelopment: boolean;
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private configService: ConfigService,
    private firebaseService: FirebaseService
  ) {
    const env = this.configService.get<string>('ENV');
    this.isDevelopment = env === 'development' || env === 'local';
  }

  async getUser(id) {
    return filterOne(this.userModel, { _id: id });
  }

  async setUser(authenticatorId, data) {
    return upsertOne(this.userModel, data, { authenticatorId },);
  }

  async getUserByAuthenticatorId(authenticatorId) {
    return filterOne(this.userModel, {
      authenticatorId,
    });
  }

  async verifyToken(token: string) {
    const authenticatorUser = await this.firebaseService.verifyToken(token);
    let user = await this.getUserByAuthenticatorId(authenticatorUser.uid);
    // if no user then could register user with the setUser field...
    if (!user) (user = await this.setUser(authenticatorUser.uid, { authenticatorId: authenticatorUser.uid, email: authenticatorUser.email, authenticatorProviderKey: authenticatorUser.firebase.sign_in_provider ?? null }));
    return {
      email: authenticatorUser.email,
      authenticatorId: authenticatorUser.uid,
      id: user._id,
      authTime: authenticatorUser.auth_time,
      roles: user.roles,
      authenticatorProviderKey: user.authenticatorProviderKey,
    }
  }
}
