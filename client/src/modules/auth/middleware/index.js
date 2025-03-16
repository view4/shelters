import MiddlewareModule from "modules/Core/core-modules/MiddlewareModule";
import { STAMPS_FRAGMENT } from "modules/Core/consts/graphql";
import { FEED_INFO_FRAGMENT } from "modules/Core/middleware/const";
import { AUTH } from "../consts";

export default new MiddlewareModule({
  name: AUTH,
  operations: {
    login: `
            mutation upsertEntry($input: EntryInput, $id: String) {
                upsertEntry(input: $input, id: $id) {
                    id
                }
            }
        `,
    register: `
            query entries($feedParams: FeedParams, $boothId: String) {
                feed: entries(feedParams: $feedParams, boothId: $boothId) {
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
    validateToken: `
        query user {
            user {
                id
                email
                membership {
                    id
                    isActive
                    ${STAMPS_FRAGMENT}
                }
                boothCount
            }
        }
    `,
  },
});
