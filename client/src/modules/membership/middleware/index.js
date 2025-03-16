import MiddlewareModule from "modules/Core/core-modules/MiddlewareModule";
import { MEMBERSHIP } from "../consts";

export default new MiddlewareModule({
  name: MEMBERSHIP,
  operations: {
    create: `
            mutation initMembership{
                initMembership {
                    amount
                    currency
                    clientSecret
                }
            }
        `,
    cancel: `
            mutation cancelMembership{
                cancelMembership
            }
        `,
  },
});
