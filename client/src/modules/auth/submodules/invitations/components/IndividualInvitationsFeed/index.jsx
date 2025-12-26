import strapped from "modules/Core/higher-order-components/strapped";
import { individualInvitationFeed } from "../../state/feed";
import FeedRowItem from "../FeedRowItem";

const FeedItem = ({ id, email, createdAt }) => (
    <FeedRowItem data={{
        email,
        createdAt,
    }} />
);

export default strapped(individualInvitationFeed.FeedComponent, () => ({
    ItemComponent: FeedItem,
}));

