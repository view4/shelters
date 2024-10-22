import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Gateway, GatewaySchema } from './schema/gateway.schema';
import { RoadmapsResolver } from './roadmaps.resolver';
import { RoadmapsService } from './roadmaps.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Gateway.name, schema: GatewaySchema },
        ]),
    ],
    providers: [
        RoadmapsResolver,
        RoadmapsService
    ],
    exports: [
        RoadmapsService
    ]
})
export class RoadmapsModule { }
