import strapped from "modules/Core/higher-order-components/strapped";
import { selfInvitationFeed } from "../../state/feed";
import FeedRowItem from "../FeedRowItem";

const FeedItem = ({ id, email, name, text }) => (
    <FeedRowItem data={{
        email,
        name: name || "No name provided",
        text: text || "No message",
    }} />
);

export default strapped(selfInvitationFeed.FeedComponent, () => ({
    ItemComponent: FeedItem,
}));

