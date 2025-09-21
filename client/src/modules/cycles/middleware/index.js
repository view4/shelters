import MiddlewareModule from "modules/Core/core-modules/MiddlewareModule";
import { CYCLES } from "../consts";
import { STAMPS_FRAGMENT } from "modules/Core/consts/graphql";
import { GATEWAY_FRAGMENT } from "modules/roadmaps/middleware";

const CYCLE_FRAGMENT = `                    
                    name 
                    text
                    id
                    boothId
                    a ${GATEWAY_FRAGMENT}
                    b ${GATEWAY_FRAGMENT}
                    c ${GATEWAY_FRAGMENT}
                    d ${GATEWAY_FRAGMENT}
                    e ${GATEWAY_FRAGMENT}
                    f ${GATEWAY_FRAGMENT}
                    sabbatical {
                        gateway ${GATEWAY_FRAGMENT}
                    } 
                    createdAt
                    ${STAMPS_FRAGMENT}
`;

export default new MiddlewareModule({
    name: CYCLES,
    operations: {
        create: `
            mutation upsertCycle($input: CycleInput, $id: String) {
                upsertCycle(input: $input, id: $id) {
                    id
                }
            }
        `,
        completeCycle: `
            mutation completeCycle($id: String) {
                completeCycle(id: $id) {
                    id
                }
            } 
        `,
        fetchFeed: `
            query cycles($feedParams: FeedParams, $boothId: String, $isCompleted: Boolean, $isForthcoming: Boolean ) {
                feed: cycles(feedParams: $feedParams, boothId: $boothId, isCompleted: $isCompleted, isForthcoming: $isForthcoming) {
                    entities {
                        ${CYCLE_FRAGMENT}
                    }
                }    
            }
        `,
        fetchCurrentcycle: `
            query currentCycle($boothId: String) {
                currentCycle(boothId: $boothId) {
                    ${CYCLE_FRAGMENT}
                }
            }
        `,
        fetchEntity: `
            query cycle($id: String) {
                entity: cycle(id: $id) {
                    ${CYCLE_FRAGMENT}
                }
            }
        `,
        addGatewayToCycle: `
            mutation addGatewayToCycle($cycleId: String, $gatewayId: String) {
                addGatewayToCycle(cycleId: $cycleId, gatewayId: $gatewayId) {
                    id
                }
            }
        `,
        focusCycle: `
        mutation focusCycle($id: String) {
            focusCycle(id: $id) {
                id
            }
        }
    `,
    },
    operationsConfig: {
        // fetchEntity: {
        //     paramsParser: ({ id = null }) => ({ boothId: id }),
        // },
    },
});
