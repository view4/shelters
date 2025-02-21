import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FirebaseService } from './firebase.service';

@Module({
  imports: [
  ],
  controllers: [],
  providers: [FirebaseService ],
  exports: [FirebaseService],
})
export class FirebaseModule {}
