import { forwardRef, Module } from '@nestjs/common';
import { MalchutService } from './malchut.service';
import { MalchutResolver } from './malchut.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { MalchutBooth, MalchutBoothSchema } from './schema/malchut-booth.schema';
import { Directive, DirectiveSchema } from './schema/directive.schema';
import { DirectiveComment, DirectiveCommentSchema } from './schema/directive-comment.schema';
import { BoothsService } from 'src/booths/booths.service';
import { BoothInput } from 'src/booths/booths.resolver';
import { ID } from 'src/common/types';
import { upsert } from 'src/common/utils/db';
import { EntriesModule } from 'src/entries/entries.module';
import { AuthModule } from 'src/auth/auth.module';
import { BoothsModule } from 'src/booths/booths.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: MalchutBooth.name, schema: MalchutBoothSchema },
            { name: Directive.name, schema: DirectiveSchema },
            { name: DirectiveComment.name, schema: DirectiveCommentSchema },
        ]),
        EntriesModule,
        forwardRef(() => AuthModule),
        BoothsModule,
    ],
    providers: [MalchutService, MalchutResolver],
    controllers: [],
    exports: [MalchutService],
})
export class MalchutModule { } 