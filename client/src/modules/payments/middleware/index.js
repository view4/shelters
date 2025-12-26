import MiddlewareModule from "modules/Core/core-modules/MiddlewareModule";
import { PAYMENTS } from "../consts";

export default new MiddlewareModule({
    name: PAYMENTS,
    operations: {
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
                    info {
                        totalCount
                    }
                }
            }
        `,
    },
});
