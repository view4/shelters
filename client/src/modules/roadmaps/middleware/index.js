import MiddlewareModule from "modules/Core/core-modules/MiddlewareModule";
import { ROADMAPS } from "../consts";
import { STAMPS_FRAGMENT } from "modules/Core/consts/graphql";

export default new MiddlewareModule({
  name: ROADMAPS,
  operations: {
    fetchEntity: `
        query gateway($id: String) {
            entity: gateway(id: $id) {
                id
                name
                text
                parent {
                    id
                    name
                }
                children {
                    id 
                    name
                    text
                    ${STAMPS_FRAGMENT}
                    children {
                        id 
                        name
                        text
                        parent {
                            id
                            name
                        }
                        ${STAMPS_FRAGMENT}
                    }
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
            query gateways($feedParams: FeedParams, $boothId: String, $parentId: String, $isCycleless: Boolean ) {
                feed: gateways(feedParams: $feedParams, boothId: $boothId, parentId: $parentId, isCycleless: $isCycleless) {
                    entities {
                        id
                        name
                        text
                        ${STAMPS_FRAGMENT}
                        children {
                            id
                            name
                            text
                            parent {
                                id
                                name
                            }
                            ${STAMPS_FRAGMENT}
                            children {
                                id 
                                name
                                text
                                ${STAMPS_FRAGMENT}
                                parent {
                                    id
                                    name
                                }
                            }
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
