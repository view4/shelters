import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cycle, CycleSchema } from './schema/cycle.schema';
import { CyclesResolver } from './cycles.resolver';
import { CyclesService } from './cycles.service';
import { SabbaticalsModule } from 'src/sabbaticals/sabbaticals.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Cycle.name, schema: CycleSchema }
        ]),
        SabbaticalsModule

    ],
    providers: [
        CyclesResolver,
        CyclesService
    ]
})
export class CyclesModule { }
