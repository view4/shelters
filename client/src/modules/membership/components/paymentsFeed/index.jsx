import strapped from "modules/Core/higher-order-components/strapped";
import paymentsFeed from "modules/payments/state/feed";


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

export default strapped(paymentsFeed.FeedComponent, ({ userId }) => ({
    filters: useMemo(() => ({ userId }), [userId]),
    ItemComponent: FeedItem,
}));