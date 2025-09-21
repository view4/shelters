import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FirebaseAdmin } from './config';

@Injectable()
export class FirebaseService { 
  constructor(private readonly firebaseAdmin: FirebaseAdmin) {}
  //maybe rename to FirebaseAdapterService, or AuthAdapterSerrvice 

  async verifyToken(token: string) {
    try {
      // Consider adding further wrapping here... i.e. retrning data in desierable format
      return await this.firebaseAdmin.getAuth().verifyIdToken(token);
    
    } catch (error) {
      console.log(error)
      throw new UnauthorizedException('Invalid token');
    }
  }

  async getUser(uid: string) {
    return await this.firebaseAdmin.getAuth().getUser(uid);
  }
}
