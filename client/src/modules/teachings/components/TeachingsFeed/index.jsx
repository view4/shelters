import { useMemo } from "react";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import feed from "../../state/feed";
import TeachingFeedItem from "./TeachingFeedItem";

const Component = (props) => (
    <Container maxWidth justifyCenter>
        <feed.FeedComponent
            ItemComponent={TeachingFeedItem}
            {...props} />
    </Container>
);

export default strappedConnected(
    Component,
    {},
    {},
    ({ boothId }) => ({
        filters: useMemo(() => ({ boothId }), [boothId]),
    })
); 