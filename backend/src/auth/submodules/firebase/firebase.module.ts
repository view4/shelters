import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { FirebaseAdmin } from './config';

@Module({
  imports: [
  ],
  controllers: [],
  providers: [FirebaseService, FirebaseAdmin ],
  exports: [FirebaseService],
})
export class FirebaseModule {}
