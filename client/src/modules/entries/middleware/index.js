import MiddlewareModule from "modules/Core/core-modules/MiddlewareModule";
import { ENTRIES } from "../consts";
import { STAMPS_FRAGMENT } from "modules/Core/consts/graphql";
import { FEED_INFO_FRAGMENT } from "modules/Core/middleware/const";

export default new MiddlewareModule({
  name: ENTRIES,
  operations: {
    create: `
            mutation upsertEntry($input: EntryInput, $id: String) {
                upsertEntry(input: $input, id: $id) {
                    id
                }
            }
        `,
    fetchFeed: `
            query entries($feedParams: FeedParams, $boothId: String, $search: String) {
                feed: entries(feedParams: $feedParams, boothId: $boothId, search: $search) {
                    entities {
                        id
                        name
                        text
                        createdAt
                        ${STAMPS_FRAGMENT}
                    }
                        ${FEED_INFO_FRAGMENT}
                }    
            }
        `,
    fetchEntity: `
        query entry($id: String) {
            entity: entry(id: $id) {
                id
                name
                text
                createdAt
                boothId: booth
                ${STAMPS_FRAGMENT}
            }
        }
    `,
    stampEntity: `
            mutation stampEntry($id: String, $key: String) {
                stampEntry(id: $id, key: $key) {
                    id
                }
            }
        `,
  },
});
