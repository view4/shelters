import Container from "modules/Core/components/ui-kit/Container";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import feed from "modules/timetracker/state/feed";
import { useMemo, useCallback } from "react";
import AllocateTimeButton from "../AllocateTimeButton";
import Card from "modules/Core/components/ui-kit/Card";
import Features from "modules/Core/components/ui-kit/Features";
import ExpandableOptions from "modules/Core/components/ui-kit/ExpandableOptions";
import TrackTimeButton from "../TrackTimeButton/index";
import Button from "modules/Core/components/ui-kit/Button";

const Component = feed.FeedComponent;

const FeedItemComponent = ({
    name,
    mins,
    text,
    onRemove,
    id
}) => (
    <Card header={name}>
        <ExpandableOptions
            options={[
                {
                    Component: TrackTimeButton, props: { id, text: "Track Time" }
                },
                {
                    Component: Button, props: { text: "Remove", onConfirm: () => onRemove(id) }
                }
            ]}
        />
        <Features
            features={[
                { name: "Time", content: mins },
                { name: "Description", content: text }

            ]}
            featureProps={{
                flex: true,
                spaceBetween: true,
                alignCenter: true
            }}
        />

    </Card>
)

const TrackedTimeFeed = ({ boothId, filters }) => (
    <Container flex alignCenter>
        <Component
            filters={filters}
            ItemComponent={FeedItemComponent}
        />
        <AllocateTimeButton boothId={boothId} />
    </Container>
)

export default strappedConnected(
    TrackedTimeFeed,
    {},
    {
        onRemove: (id, callback) => feed.cells.removeEntity.action({ id, callback }),
        refetch: () => feed.cells.fetchFeed.action({ renewStream: true })
    },
    ({ dedicatedTimeId, onRemove, refetch }) => ({
        filters: useMemo(() => ({
            dedicatedTimeId,
        }), []),
        itemProps: useMemo(() => ({
            onRemove: useCallback((id) => onRemove(id, refetch), [onRemove, refetch])
        }), [onRemove]),
    })
)