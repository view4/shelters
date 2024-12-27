import MiddlewareModule from "modules/Core/core-modules/MiddlewareModule";
import { CYCLES } from "../consts";
import { STAMPS_FRAGMENT } from "modules/Core/consts/graphql";

const GATEWAY_FRAGMENT = `
    {
        name
        text
        id 
        ${STAMPS_FRAGMENT}
    }
`;

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
            query cycles($feedParams: FeedParams, $boothId: String) {
                feed: cycles(feedParams: $feedParams, boothId: $boothId) {
                    entities {
                        id
                        name
                        text
                    }
                }    
            }
        `,
    fetchEntity: `
            query currentCycle($boothId: String) {
                currentCycle(boothId: $boothId) {
                    ${CYCLE_FRAGMENT}
                }
            }
        `,
  },
  operationsConfig: {
    fetchEntity: {
      paramsParser: ({ id = null }) => ({ boothId: id }),
    },
  },
});
