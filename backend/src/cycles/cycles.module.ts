import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cycle, CycleSchema } from './schema/cycle.schema';
import { CyclesResolver } from './cycles.resolver';
import { CyclesService } from './cycles.service';
import { SabbaticalsModule } from 'src/sabbaticals/sabbaticals.module';
import { BoothsModule } from 'src/booths/booths.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Cycle.name, schema: CycleSchema }
        ]),
        forwardRef(() => SabbaticalsModule),
        BoothsModule,
        AuthModule

    ],
    providers: [
        CyclesResolver,
        CyclesService
    ],
    exports: [
        CyclesService
    ]
})
export class CyclesModule { }
