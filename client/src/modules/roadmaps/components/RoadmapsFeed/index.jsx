import Container from "modules/Core/components/ui-kit/Container";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import feed from "modules/roadmaps/state/feed";
import { useMemo } from "react";
import RoadmapFeedItem from "../RoadmapFeedItem";


const Component = (props) => (
    <Container maxWidth justifyCenter>
        <feed.FeedComponent
            ItemComponent={RoadmapFeedItem}
            {...props} />
    </Container>
)


export default strappedConnected(
    Component,
    {},
    {
    },
    ({ boothId }) => ({
        filters: useMemo(() => ({ boothId, parentId: null }), [boothId]),
    })
)