import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Entry, EntrySchema } from './schema/entry.schema';
import { Comment, CommentSchema } from './schema/comment.schema';
import { EntriesService } from './entries.service';
import { EntriesResolver } from './entries.resolver';
import { CommentsService } from './comments.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Entry.name, schema: EntrySchema },
            { name: Comment.name, schema: CommentSchema },
        ]),
    ],
    providers: [
        EntriesResolver,
        EntriesService,
        CommentsService
    ],
    exports: [
        EntriesService,
        CommentsService
    ]
})
export class EntriesModule { }
