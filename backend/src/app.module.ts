import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BoothsModule } from './booths/booths.module';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import { TimetrackerModule } from './timetracker/timetracker.module';
import { RoadmapsModule } from './roadmaps/roadmaps.module';
import { CyclesModule } from './cycles/cycles.module';
import { SabbaticalsModule } from './sabbaticals/sabbaticals.module';

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

      // typePaths: ['./**/*.graphql'],
      // useGlobalPrefix: true,
      // autoSchemaFile: true,
      // "compilerOptions": {
      //   "plugins": ["@nestjs/graphql"]
      // },
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // autoSchemaFile: 'schema.gql',
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'),


      // installSubscriptionHandlers: true,
      sortSchema: true,
      // playground: true,
      // debug: configService.get<boolean>("DEBUG"),
      // uploads: false,
    }),
    BoothsModule,
    AuthModule,
    TimetrackerModule,
    RoadmapsModule,
    CyclesModule,
    SabbaticalsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
