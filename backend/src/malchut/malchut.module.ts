import { forwardRef, Module } from '@nestjs/common';
import { MalchutService } from './malchut.service';
import { MalchutResolver } from './malchut.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { MalchutBooth, MalchutBoothSchema } from './schema/malchut-booth.schema';
import { Directive, DirectiveSchema } from './schema/directive.schema';
import { DirectiveComment, DirectiveCommentSchema } from './schema/directive-comment.schema';
import { DirectiveVote, DirectiveVoteSchema } from './schema/directive-vote.schema';

import { EntriesModule } from 'src/entries/entries.module';
import { AuthModule } from 'src/auth/auth.module';
import { BoothsModule } from 'src/booths/booths.module';
import { CommonModule } from 'src/common/common.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: MalchutBooth.name, schema: MalchutBoothSchema },
            { name: Directive.name, schema: DirectiveSchema },
            { name: DirectiveComment.name, schema: DirectiveCommentSchema },
            { name: DirectiveVote.name, schema: DirectiveVoteSchema },
        ]),
        EntriesModule,
        forwardRef(() => AuthModule),
        BoothsModule,
        CommonModule,
    ],
    providers: [MalchutService, MalchutResolver],
    controllers: [],
    exports: [MalchutService],
})
export class MalchutModule { } 