import MiddlewareModule from "modules/Core/core-modules/MiddlewareModule";
import { ROADMAPS } from "../consts";
import { STAMPS_FRAGMENT } from "modules/Core/consts/graphql";

export const GATEWAY_FIELDS_FRAGMENT = `
                id
                name
                text
                ${STAMPS_FRAGMENT}
`

export const GATEWAY_FRAGMENT = `
    {
        ${GATEWAY_FIELDS_FRAGMENT}
        parent {
            ${GATEWAY_FIELDS_FRAGMENT}
        }
        children {
            ${GATEWAY_FIELDS_FRAGMENT}
            children {
                ${GATEWAY_FIELDS_FRAGMENT}
            }
        }
    }
`



export default new MiddlewareModule({
  name: ROADMAPS,
  operations: {
    fetchEntity: `
        query gateway($id: String) {
            entity: gateway(id: $id) ${GATEWAY_FRAGMENT}
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
                    entities ${GATEWAY_FRAGMENT}
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
