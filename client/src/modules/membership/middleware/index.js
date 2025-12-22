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
    query subscriptions($feedParams: FeedParams) {
        feed: subscriptions(feedParams: $feedParams) {
            entities {
                id
                user {
                    email
                    id
                }
                stamps {
                    activatedDate
                }
                subscriptionId
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