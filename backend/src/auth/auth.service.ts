import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from './schemas/user.schema';
import { ConfigService } from '@nestjs/config';
import { ROLES } from './schemas/const';

@Injectable()
export class AuthService {
  isDevelopment: boolean;
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    const env = this.configService.get<string>('ENV');
    this.isDevelopment = env === 'development' || env === 'local';
  }

  async login(phoneNumber) {
    // const hashed = handleHash(phoneNumber);
    // let user = await this.userModel.findOne({ phoneId: hashed });
    // if (!user) {
    //   user = await this.userModel.create({
    //     phoneId: hashed,
    //     isValidated: false,
    //   });
    // }
    // const validationCode = await this.generateValidationCode(hashed);
    // this.smsService.sendSms(phoneNumber, `Your validation code for p4p is: ${validationCode}`);
    // return { validationCode: this.isDevelopment && validationCode  };
  }
  FIVE_MINUTES = 60 * 5 * 1000;
  CODE_LENGTH = 7


  async fetchUser(phoneNumber: string) {
  }
}
