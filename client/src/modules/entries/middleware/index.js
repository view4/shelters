import MiddlewareModule from "modules/Core/core-modules/MiddlewareModule";
import { ENTRIES } from "../consts";
import { STAMPS_FRAGMENT } from "modules/Core/consts/graphql";

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
            query entries($feedParams: FeedParams, $boothId: String) {
                feed: entries(feedParams: $feedParams, boothId: $boothId) {
                    entities {
                        id
                        name
                        text
                        ${STAMPS_FRAGMENT}
                    }
                }    
            }
        `,
    fetchEntity: `
        query entry($id: String) {
            entity: entry(id: $id) {
                id
                name
                text
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
