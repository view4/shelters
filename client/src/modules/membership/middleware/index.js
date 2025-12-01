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
        fetchFeed: `
            query subscriptionPayments($feedParams: FeedParams, $userId: String) {
                feed: subscriptionPayments(feedParams: $feedParams, userId: $userId) {
                    entities {
                        id
                        amount
                        paidAt
                        externalId
                        user {
                            email
                            id
                        }
                    }
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