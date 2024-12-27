import withFocusedBoothId from "modules/booths/higher-order-components/withFocusedBoothId";
import Container from "modules/Core/components/ui-kit/Container";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import feed from "modules/timetracker/state/feed";
import { useMemo } from "react";
import AllocateTimeButton from "../AllocateTimeButton";
import Card from "modules/Core/components/ui-kit/Card";
import Features from "modules/Core/components/ui-kit/Features";

const Component = feed.FeedComponent;

const FeedItemComponent = ({
    name,
    trackedTime,
    mins,   
    totalMins
}) => (
    <Card header={name}>
        <Features
            features={[
                { name: "Total Time", content: `${totalMins / 60}hrs` },
                { name: "Total Fulfilled Time", content: `${trackedTime / 60}hrs` },
                { name: "", content: "Progress Bar here" }

            ]}
            featureProps={{ flex: true, spaceBetween: true, alignCenter: true }}
        />

    </Card>
)

const DedicatedTimeFeed = ({ boothId, filters }) => (
    <Container flex alignCenter>
        <Component
            filters={filters}
            ItemComponent={FeedItemComponent}
        />
        <AllocateTimeButton boothId={boothId} />
    </Container>
)

export default withFocusedBoothId(strappedConnected(
    DedicatedTimeFeed,
    {},
    {},
    ({ boothId }) => ({
        filters: useMemo(() => ({
            boothId,
            parentId: null,
        }), [boothId])
    })
))