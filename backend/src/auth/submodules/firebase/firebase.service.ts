import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FirebaseAdmin } from './config';

@Injectable()
export class FirebaseService {
  constructor(private readonly firebaseAdmin: FirebaseAdmin) {}

  async verifyToken(token: string) {
    try {
      return await this.firebaseAdmin.getAuth().verifyIdToken(token);
    } catch (error) {
      console.log("here....")
      console.log(error)
      throw new UnauthorizedException('Invalid token');
    }
  }

  async getUser(uid: string) {
    return await this.firebaseAdmin.getAuth().getUser(uid);
  }
}
