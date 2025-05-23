import MiddlewareModule from "modules/Core/core-modules/MiddlewareModule";
import { BOOTHS } from "../consts";
import { STAMPS_FRAGMENT } from "modules/Core/consts/graphql";

export default new MiddlewareModule({
  name: BOOTHS,
  operationsConfig: {
    fetchFeed: {
      postParser: (result) => ({
        ...result,
        feed: {
          entities: result?.feed?.entities?.map((entity) => ({
            ...entity,
            stamps: {
              ...entity?.stamps,
              created: entity.createdAt,
            },
          })),
        },
      }),
    },
  },
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
                ${STAMPS_FRAGMENT}
                createdAt
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
              ${STAMPS_FRAGMENT}
              isFocused
            }
          }
    `,
    fetchFocusedBooth: `
      query focusedBooth {
        focusedBooth {
          id
          name
          text
          ${STAMPS_FRAGMENT}
          isFocused
        }
      }
    `,
    fetchActiveBooths: `
      query activeBooths {
        activeBooths {
          entities {
            id
            name
            text
            ${STAMPS_FRAGMENT}
            isFocused
          }
        }
      }
    `,
  },
});
