import { Module } from '@nestjs/common';
import { Booth, BoothSchema } from './schema/booth.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BoothsResolver } from './booths.resolver';
import { BoothsService } from './booths.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Booth.name, schema: BoothSchema },
        ]),
    ],
    providers: [
        BoothsResolver,
        BoothsService
    ],
    exports: [BoothsService]
})
export class BoothsModule {}
