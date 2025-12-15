import { useMemo } from "react";
import strapped from "modules/Core/higher-order-components/strapped";
import paymentsFeed from "modules/payments/state/feed";
import Card from "modules/Core/sub-modules/ui-kit/components/Card";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";


export const FeedRowItem = ({ data }) => (
    // like improve and extract.. 
    <Card>
        {Object.entries(data).map(([key, value]) => (
            <Container>
                <Text>{value}</Text>
            </Container>
        ))}
    </Card>
)

const FeedItem = ({ amount, paidAt, externalId, user, receiptUrl }) => (
    <FeedRowItem data={{
        amount, paidAt, externalId, user, link: <>
            <a
                href={receiptUrl} target="_blank" rel="noreferrer"
                style={{
                    color: "blue",
                    textDecoration: "underline",
                }}
            >View Receipt</a>
        </>
    }} />
)

const MOCK_DATA = [
    {
        id: "1",
        amount: "100",
        paidAt: "2021-01-01",
        externalId: "1234567890",
        user: {
            email: "test@test.com",
        },
    },
    {
        id: "2",
        amount: "200",
        paidAt: "2021-01-02",
        externalId: "1234567891",
        user: {
            email: "test2@test.com",
        },
    },
    {
        id: "3",
        amount: "300",
        paidAt: "2021-01-03",
        externalId: "1234567892",
        user: {
            email: "test3@test.com",
        },
    },
]

export default strapped(paymentsFeed.FeedComponent, ({ userId }) => ({
    feed: MOCK_DATA,
    filters: useMemo(() => ({ userId }), [userId]),
    table: true,
    columns: [
        {
            key: "id",
            label: "ID",
        },
        {
            key: "amount",
            label: "Amount",
        },
        {
            key: "paidAt",
            label: "Paid At",
        },

        {
            key: "externalId",
            label: "External ID",
        },
        {
            key: "user.email",
            label: "User Email",
        },
        {
            key: "receiptUrl",
            label: "Receipt URL",
            parser: (value) => <a href={value} target="_blank" rel="noreferrer">{"receipt"}</a>,
        },
    ],
}));