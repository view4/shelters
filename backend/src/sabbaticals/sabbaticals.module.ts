import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SabbaticalGateway, SabbaticalGatewaySchema } from './schema/sabbatical-gateway.schema';
import { SabbaticalsService } from './sabbaticals.service';
import { RoadmapsModule } from 'src/roadmaps/roadmaps.module';
import { CyclesModule } from 'src/cycles/cycles.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: SabbaticalGateway.name, schema: SabbaticalGatewaySchema }
        ]),
        RoadmapsModule,
        forwardRef(() => CyclesModule)
    ],
    providers: [
        SabbaticalsService
    ],
    exports: [
        SabbaticalsService
    ]
})
export class SabbaticalsModule {}
