import MiddlewareModule from "modules/Core/core-modules/MiddlewareModule";
import { TIMETRACKER } from "../consts";

export default new MiddlewareModule({
    name: TIMETRACKER,
    operations: {
        create: `
            mutation dedicateTime($input: DedicatedTimeInput, $id: String) {
                entity: dedicateTime(input: $input, id: $id) {
                    id
                }
            }
        `,
        fetchEntity: `
            query dedicatedTime($id: String) {
                entity: dedicatedTime(id: $id) {
                    id
                    name
                    text
                    mins
                    trackedTime
                    totalMins
                }
            }
        `,
        fetchFeed: `
            query dedicatedTimes($feedParams: FeedParams, $boothId: String, $parentId: String, $search: String) {
                feed: dedicatedTimes(feedParams: $feedParams, boothId: $boothId, parentId: $parentId, search: $search) {
                    entities {
                        id
                        name
                        text
                        mins 
                        trackedTime
                        totalMins
                        children {
                            id
                            name 
                            text
                            mins
                            trackedTime
                        }
                    }
                }    
            }
        `,
        trackTime: `
            mutation trackTime($input: TrackedTimeInput, $id: String) {
                entity: trackTime(input: $input, id: $id) {
                    id
                }
            }
        `,
        
        fetchTrackedTimeFeed: ``
    }
})