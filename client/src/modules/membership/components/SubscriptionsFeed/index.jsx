import { useMemo } from "react";
import strapped from "modules/Core/higher-order-components/strapped";
import subscriptionsFeed from "modules/membership/state/feed";
import Card from "modules/Core/sub-modules/ui-kit/components/Card";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";
import AdminSyncUserSubscriptionPayments from "modules/admin/components/AdminSyncUserSubscriptionPayments";

const MOCK_DATA = [
    {
        id: "1",
        userEmail: "test@test.com",
        userId: "1",
        activated: "2021-01-01",
        deactivated: "2021-01-01",
        user: {
            email: "test@test.com",
            id: "1",
        },
        stamps: {
            activatedDate: "2021-01-01",
        },
        subscriptionId: "1",
    },
    {
        id: "2",
        userEmail: "test2@test.com",
        userId: "2",
        activated: "2021-01-01",
        deactivated: "2021-01-01",
        subscriptionId: "2",
        user: {
            email: "test2@test.com",
            id: "2",
        },
        stamps: {
            activatedDate: "2021-01-01",
        },
    },
    {
        id: "3",
        userEmail: "test3@test.com",
        userId: "3",
        activated: "2021-01-01",
        deactivated: "2021-01-01",
        subscriptionId: "3",
        user: {
            email: "test3@test.com",
            id: "3",
        },
        stamps: {
            activatedDate: "2021-01-01",
        },
    },
]

const columns = [
    {
        key: "id",
        label: "ID",
    },
    {
        key: "subscriptionId",
        label: "Subscription ID",
    },
    {
        key: "user.email",
        label: "User Email",
    },
    {
        key: "user.id",
        label: "User ID",
    },
    {
        key: "stamps.activatedDate",
        label: "Activated",
    },
    {
        key:'sync', 
        label: "Sync payments",
        render: (props) => <AdminSyncUserSubscriptionPayments userId={props.user.id} />
    }
]

export default strapped(subscriptionsFeed.FeedComponent, ({ userId }) => ({
    filters: useMemo(() => ({ userId }), [userId]),
    // feed: MOCK_DATA,
    columns,
    table: true,
}));