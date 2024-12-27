import MiddlewareModule from "modules/Core/core-modules/MiddlewareModule";
import { ROADMAPS } from "../consts";
import { STAMPS_FRAGMENT } from "modules/Core/consts/graphql";

export default new MiddlewareModule({
  name: ROADMAPS,
  operations: {
    create: `
            mutation upsertRoadmap($input: RoadmapInput, $id: String) {
                upsertRoadmap(input: $input, id: $id) {
                    id
                }
            }
        `,
    // TODO: Fetch gateways dynamically on demand and not each time.
    fetchFeed: `
            query roadmaps($feedParams: FeedParams, $boothId: String) {
                feed: roadmaps(feedParams: $feedParams, boothId: $boothId) {
                    entities {
                        id
                        name
                        text
                        gateways {
                            id 
                            name 
                            text 
                            ${STAMPS_FRAGMENT}
                        }
                        children {
                            id 
                            name
                            text
                            ${STAMPS_FRAGMENT}
                        }
                        ${STAMPS_FRAGMENT}
                    }
                }    
            }
        `,
    fetchEntity: `
        query roadmap($id: String) {
            entity: roadmap(id: $id) {
                id
                name
                text
                gateways {
                    id 
                    name 
                    text 
                    ${STAMPS_FRAGMENT}
                }
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
    stampEntity: `
            mutation stampRoadmap($id: String, $key: String) {
                stampRoadmap(id: $id, key: $key) {
                    id
                }
            }
        `,
    createGateway: `
            mutation upsertGateway($input: GatewayInput, $id: String) {
                upsertGateway(input: $input, id: $id) {
                    id
                }
            }
        `,
    fetchGatewaysFeed: `
            query gateways($feedParams: FeedParams, $boothId: String, $roadmapId: String) {
                feed: gateways(feedParams: $feedParams, boothId: $boothId, roadmapId: $roadmapId) {
                    entities {
                        id
                        name
                        text
                        ${STAMPS_FRAGMENT}
                    }
                }    
            }
        `,
    stampGatewayEntity: `
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
