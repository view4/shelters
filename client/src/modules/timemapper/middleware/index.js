import MiddlewareModule from "modules/Core/core-modules/MiddlewareModule";
import { TIMEMAPPER } from "../consts";

export default new MiddlewareModule({
    name: TIMEMAPPER,
    operations: {
        create: `
            mutation upsertScheduledTime($input: ScheduledTimeInput, $id: String) {
                entity: upsertScheduledTime(input: $input, id: $id) {
                    id
                }
            }
        `,
        fetchFeed: `
            query scheduledTimes($feedParams: FeedParams, $boothId: String, $start: Date, $end: Date) {
                feed: scheduledTimes(feedParams: $feedParams, boothId: $boothId, start: $start, end: $end) {
                    entities {
                        id
                        name
                        text
                        start
                        end 
                    }
                }    
            }
        `,
        removeEntity: `
            mutation removeScheduledTime($id: String) {
                entity: removeScheduledTime(id: $id) 
            }
        `,
    }
})