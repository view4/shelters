import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DedicatedTime, DedicatedTimeSchema } from './schema/dedicated-time.schema';
import { TrackedTime, TrackedTimeSchema } from './schema/tracked-time.schema ';
import { TimetrackerResolver } from './timetracker.resolver';
import { TimetrackerService } from './timetracker.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: DedicatedTime.name, schema: DedicatedTimeSchema },
            { name: TrackedTime.name, schema: TrackedTimeSchema }
        ]),
    ],
    providers: [
        TimetrackerResolver,
        TimetrackerService
    ]
})
export class TimetrackerModule { }
