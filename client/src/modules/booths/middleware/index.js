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
          query booths($feedParams: FeedParams, $kind: String, $parentId: String) {
            feed: booths(feedParams: $feedParams, kind: $kind, parentId: $parentId) {
              entities {
                id
                name
                text
                ${STAMPS_FRAGMENT}
                createdAt
                parent {
                  id
                  name
                  text
                }
                mapal {
                  id
                }
                malchut {
                  id
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
              ${STAMPS_FRAGMENT}
              isFocused
              parent {
                  id
                  name
                  text
              }
              mapal {
                id
              }
              malchut {
                id
              }
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
