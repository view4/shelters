import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Entry, EntrySchema } from './schema/entry.schema';
// import { Gateway, GatewaySchema } from './schema/gateway.schema';
// import { RoadmapsResolver } from './roadmaps.resolver';
// import { RoadmapsService } from './roadmaps.service';
// import { Roadmap, RoadmapSchema } from './schema/roadmap.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Entry.name, schema: EntrySchema },
        ]),
    ],
    providers: [
        RoadmapsResolver,
        RoadmapsService
    ],
    exports: [
        RoadmapsService
    ]
})
export class EntriesModule { }
