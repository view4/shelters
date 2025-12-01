import strapped from "modules/Core/higher-order-components/strapped";
import feed from "modules/membership/state/feed";

const FeedItem = ({amount, paidAt, externalId, user}) => (
    // I think from here, handle a new row component basicall, and I think that is good. 
    //   maybe also like a table feed component could be good, and fine... 
    <Card>
        <Text>{amount}</Text>
        <Text>{paidAt}</Text>
        <Text>{externalId}</Text>
        <Text>{user.email}</Text>
    </Card>
)

export default strapped(feed.FeedComponent, ({userId}) => ({
    filters: useMemo(() => ({ userId }), [userId]),
}));