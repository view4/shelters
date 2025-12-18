import MiddlewareModule from "modules/Core/core-modules/MiddlewareModule";
import { ADMIN } from "../consts";

export default new MiddlewareModule({
    name: ADMIN,
    operations: {
        fetchUsers: `
            query users($feedParams: FeedParams) {
                feed: users(feedParams: $feedParams) {
                    entities {
                        id
                        email
                        createdAt
                        boothCount
                    }
                }
            }
        `,
        fetchSubscriptions: `
            query subscriptions {
                subscriptions {
                    entities {
                        id
                    }
                    info {
                        totalCount
                    }
                }
            }
        `,
        fetchSubscriptionPayments: `
            query subscriptionPayments {
                subscriptionPayments {
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
        stampInvitationApplication: `
            mutation stampInvitationApplication($id: String!, $key: String!) {
                stampInvitationApplication(id: $id, key: $key) {
                    id
                    stamps {
                        commenced
                        denied
                    }
                }
            }
        `,
        syncSubscriptionPayments: `
            mutation syncSubscriptionPayments($userId: String!) {
                syncSubscriptionPayments(userId: $userId)
            }
        `,
    },
});

