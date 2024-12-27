import MiddlewareModule from "modules/Core/core-modules/MiddlewareModule";
import { BOOTHS } from "../consts";

export default new MiddlewareModule({
  name: BOOTHS,
  operations: {
    create: `
            mutation upsertBooth($input: BoothInput, $id: String) {
                entity: upsertBooth(input: $input, id: $id) {
                    id
                }
            }
        `,
    fetchFeed: `
          query booths($feedParams: FeedParams, ) {
            feed: booths(feedParams: $feedParams) {
              entities {
                id
                name
                text
                stamps {
                  commenced
                  completed
                }
              }
            }
          }
    `,
    stampEntity: `
          mutation stampBooth($id: String!, $key: String!) {
            entity: stampBooth(id: $id, key: $key) {
              id
              stamps {
                commenced
                completed
              }
            }
          }
    `,
    fetchEntity: `
          query booth($id: String!) {
            entity: booth(id: $id) {
              id
              name
              text
              stamps {
                commenced
                completed
              }
            }
          }
    `,
    fetchActiveBooth: `
      query activeBooth {
        activeBooth {
          id
          name
          text
          stamps {
            commenced
            completed
          }
        }
      }
    `,
  },
});
