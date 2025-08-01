import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DedicatedTime, DedicatedTimeSchema } from './schema/dedicated-time.schema';
import { TrackedTime, TrackedTimeSchema } from './schema/tracked-time.schema ';
import { BoothDedicatedTime, BoothDedicatedTimeSchema } from './schema/booth-dedicated-time.schema';
import { TrackedDedicatedTime, TrackedDedicatedTimeSchema } from './schema/tracked-dedicated-time.schema';
import { TimetrackerResolver } from './timetracker.resolver';
import { TimetrackerService } from './timetracker.service';
import { ScheduledTime, ScheduledTimeSchema } from './schema/scheduled-time.schema';
import { ScheduledTimeService } from './scheduled-time.service';
import { ScheduledTimeResolver } from './scheduled-time.resolver';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: DedicatedTime.name, schema: DedicatedTimeSchema },
            { name: TrackedTime.name, schema: TrackedTimeSchema },
            { name: BoothDedicatedTime.name, schema: BoothDedicatedTimeSchema },
            { name: TrackedDedicatedTime.name, schema: TrackedDedicatedTimeSchema },
            { name: ScheduledTime.name, schema: ScheduledTimeSchema },
        ]),
    ],
    providers: [
        TimetrackerResolver,
        TimetrackerService,
        ScheduledTimeService,
        ScheduledTimeResolver
    ]
})
export class TimetrackerModule { }
