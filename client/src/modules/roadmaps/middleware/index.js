import MiddlewareModule from "modules/Core/core-modules/MiddlewareModule";
import { ROADMAPS } from "../consts";
import { STAMPS_FRAGMENT } from "modules/Core/consts/graphql";

export default new MiddlewareModule({
  name: ROADMAPS,
  operations: {
    // create: `
    //         mutation upsertRoadmap($input: RoadmapInput, $id: String) {
    //             upsertRoadmap(input: $input, id: $id) {
    //                 id
    //             }
    //         }
    //     `,
    // TODO: Fetch gateways dynamically on demand and not each time.
    // fetchRoadmapsFeed: `
    //         query roadmaps($feedParams: FeedParams, $boothId: String) {
    //             feed: roadmaps(feedParams: $feedParams, boothId: $boothId) {
    //                 entities {
    //                     id
    //                     name
    //                     text
    //                     gateways {
    //                         id 
    //                         name 
    //                         text 
    //                         ${STAMPS_FRAGMENT}
    //                     }
    //                     children {
    //                         id 
    //                         name
    //                         text
    //                         ${STAMPS_FRAGMENT}
    //                     }
    //                     ${STAMPS_FRAGMENT}
    //                 }
    //             }    
    //         }
    //     `,
    fetchEntity: `
        query gateway($id: String) {
            entity: gateway(id: $id) {
                id
                name
                text
                children {
                    id 
                    name
                    text
                    ${STAMPS_FRAGMENT}
                }
                ${STAMPS_FRAGMENT}
            }
        }
    `,
    create: `
            mutation upsertGateway($input: GatewayInput, $id: String) {
                upsertGateway(input: $input, id: $id) {
                    id
                }
            }
        `,
    fetchFeed: `
            query gateways($feedParams: FeedParams, $boothId: String, $parentId: String) {
                feed: gateways(feedParams: $feedParams, boothId: $boothId, parentId: $parentId) {
                    entities {
                        id
                        name
                        text
                        ${STAMPS_FRAGMENT}
                        children {
                            id
                            name
                            text
                            ${STAMPS_FRAGMENT}
                        }
                    }
                }    
            }
        `,
    stampEntity: `
            mutation stampGateway($id: String, $key: String) {
                stampGateway(id: $id, key: $key) {
                    id
                    stamps {
                        commenced
                        completed
                    }
                }
            }
        `,
  },
});
