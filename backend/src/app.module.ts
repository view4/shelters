import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BoothsModule } from './booths/booths.module';
import { AuthModule } from './auth/auth.module';
import { TimetrackerModule } from './timetracker/timetracker.module';
import { RoadmapsModule } from './roadmaps/roadmaps.module';
import { CyclesModule } from './cycles/cycles.module';
import { SabbaticalsModule } from './sabbaticals/sabbaticals.module';
import { EntriesModule } from './entries/entries.module';
import { FirebaseModule } from './auth/submodules/firebase/firebase.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
      }),

    }),
    GraphQLModule.forRoot<YogaDriverConfig>({
      driver: YogaDriver,
      typePaths: ['./**/*.graphql'],
      useGlobalPrefix: true,
      sortSchema: true,
    }),
    BoothsModule,
    AuthModule,
    TimetrackerModule,
    RoadmapsModule,
    CyclesModule,
    SabbaticalsModule,
    EntriesModule,
    FirebaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
