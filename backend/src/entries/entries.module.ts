import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Entry, EntrySchema } from './schema/entry.schema';
import { EntriesResolver } from './entries.resolver';
import { EntriesService } from './entries.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Entry.name, schema: EntrySchema },
        ]),
    ],
    providers: [
        EntriesResolver,
        EntriesService
    ],
    exports: [
        EntriesService
    ]
})
export class EntriesModule { }
