import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FirebaseAdmin } from './config';

@Injectable()
export class FirebaseService {
  constructor(private readonly firebaseAdmin: FirebaseAdmin) {}

  async verifyToken(token: string) {
    try {
      console.log(await this.firebaseAdmin.getAuth().verifyIdToken(token))
      return await this.firebaseAdmin.getAuth().verifyIdToken(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async getUser(uid: string) {
    console.log(uid)
    return await this.firebaseAdmin.getAuth().getUser(uid);
  }
}
