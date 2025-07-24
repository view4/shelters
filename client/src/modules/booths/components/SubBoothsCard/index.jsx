import { useMemo } from "react";
import IntrospectionCard from "../IntrospectionCard";
import feed from "../../state/feed";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import StampedFeedItem, { FeedItemStamps } from "modules/Core/components/Feed/StampedFeedItem";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Stamp from "modules/Core/sub-modules/ui-kit/components/Stamp";

const Feed = feed.FeedComponent;

const FeedItem = ({ mapal, stamps, malchut, ...props }) => (
    <StampedFeedItem
        headerChildren={<Container flex row >
            {mapal?.id && <Stamp nature='somewhat_certain' stamp={"Mapal"} />}
            {malchut?.id && <Stamp nature='somewhat_certain' stamp={"Teachings"} />}
            <FeedItemStamps stamps={stamps} />
        </Container>}
        {...props}
    />
)

const SubBoothsCard = ({ parentId, kind, actions, title = "Sub-Booths", ...props }) => {
    const filters = useMemo(() => ({
        parentId,
        kind
    }), [parentId, kind]);

    return (
        <IntrospectionCard
            title={title}
            actions={actions}
            {...props}
        >
            <Feed 
                filters={filters}
                // ItemComponent={FeedItem}
            />
        </IntrospectionCard>
    );
};

export default strappedConnected(
    SubBoothsCard,
    {},
    {},
    () => ({})
);
