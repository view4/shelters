import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminCommand } from './commands/admin.command';
import { AdminModule } from './admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
        serverSelectionTimeoutMS: 5000,
      }),
    }),
    AdminModule,
  ],
  providers: [AdminCommand],
})
export class AdminCliModule {}

