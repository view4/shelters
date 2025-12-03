import strapped from "modules/Core/higher-order-components/strapped";
import { invitationsLinkFeed } from "../../state/feed";
import FeedRowItem from "../FeedRowItem";

const FeedItem = ({ id, redemptionLimit, createdAt, description }) => (
    <FeedRowItem data={{
        description: description || "No description",
        redemptionLimit: `${redemptionLimit} redemptions`,
        createdAt,
    }} />
);

export default strapped(invitationsLinkFeed.FeedComponent, () => ({
    ItemComponent: FeedItem,
}));

