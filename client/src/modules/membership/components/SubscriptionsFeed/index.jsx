import strapped from "modules/Core/higher-order-components/strapped";
import subscriptionsFeed from "modules/membership/state/feed";


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

const FeedItem = ({ id, user, stamps, subscriptionId }) => (
    <FeedRowItem data={{
        id, userEmail: user.email, userId: user.id, activated: stamps.activatedDate, deactivated: stamps.deactivatedDate, subscriptionId,
    }} />
)

export default strapped(subscriptionsFeed.FeedComponent, ({ userId }) => ({
    filters: useMemo(() => ({ userId }), [userId]),
    ItemComponent: FeedItem,
}));