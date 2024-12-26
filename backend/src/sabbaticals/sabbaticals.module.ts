import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SabbaticalGateway, SabbaticalGatewaySchema } from './schema/sabbatical-gateway.schema';
import { SabbaticalsService } from './sabbaticals.service';
import { RoadmapsModule } from 'src/roadmaps/roadmaps.module';
import { CyclesModule } from 'src/cycles/cycles.module';
import { BoothsModule } from 'src/booths/booths.module';
import { SabbaticalsResolver } from './sabbaticals.resolver';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: SabbaticalGateway.name, schema: SabbaticalGatewaySchema }
        ]),
        RoadmapsModule,
        forwardRef(() => CyclesModule),
        BoothsModule
    ],
    providers: [
        SabbaticalsService,
        SabbaticalsResolver
    ],
    exports: [
        SabbaticalsService
    ]
})
export class SabbaticalsModule {}
