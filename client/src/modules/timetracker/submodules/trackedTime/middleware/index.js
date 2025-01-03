import MiddlewareModule from "modules/Core/core-modules/MiddlewareModule";
import { TRACKED_TIME } from "../consts";

export default new MiddlewareModule({
  name: TRACKED_TIME,
  operations: {
    create: `
            mutation upsertDedicatedTime($input: DedicatedTimeInput, $id: String) {
                entity: upsertDedicatedTime(input: $input, id: $id) {
                    id
                }
            }
        `,
    fetchFeed: `
            query trackedTimes($feedParams: FeedParams, $dedicatedTimeId: String) {
                feed: trackedTimes(feedParams: $feedParams, dedicatedTimeId: $dedicatedTimeId) {
                    entities {
                        id
                        mins
                        text
                        createdAt
                        }
                    }
                }    
            }
        `,
    create: `
            mutation trackTime($input: TrackedTimeInput){
                entity: trackTime(input: $input) {
                    id
                }
            }
        `,
    remove: `
        mutation removeTrackedTime($id: String) {
            success: removeTrackedTime(id: $id) 
        }
    `,
  },
});
