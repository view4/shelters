import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SabbaticalGateway, SabbaticalGatewaySchema } from './schema/sabbatical-gateway.schema';
import { SabbaticalsService } from './sabbaticals.service';
import { RoadmapsModule } from 'src/roadmaps/roadmaps.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: SabbaticalGateway.name, schema: SabbaticalGatewaySchema }
        ]),
        RoadmapsModule
    ],
    providers: [
        SabbaticalsService
    ],
    exports: [
        SabbaticalsService
    ]
})
export class SabbaticalsModule {}
