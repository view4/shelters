import { forwardRef, Module } from '@nestjs/common';
import { Booth, BoothSchema } from './schema/booth.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BoothsResolver } from './booths.resolver';
import { BoothsService } from './booths.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Booth.name, schema: BoothSchema },
        ]),
        forwardRef(() => AuthModule)
    ],
    providers: [
        BoothsResolver,
        BoothsService,
    ],
    exports: [BoothsService]
})
export class BoothsModule { }
