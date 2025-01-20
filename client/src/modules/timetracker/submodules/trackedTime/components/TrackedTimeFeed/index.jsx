import Container from "modules/Core/components/ui-kit/Container";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import feed from "modules/timetracker/submodules/trackedTime/state/feed";
import { useMemo, useCallback } from "react";
import Card from "modules/Core/components/ui-kit/Card";
import Features from "modules/Core/components/ui-kit/Features";
import ExpandableOptions from "modules/Core/components/ui-kit/ExpandableOptions";
import Button from "modules/Core/components/ui-kit/Button";
import styles from "./styles.module.scss";
import TrackTimeButton from "../TrackTimeButton";

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
                    Component: TrackTimeButton, props: { id, text: "Edit", initialState: { text, mins } }
                },
                {
                    Component: Button, props: { modal: true, text: "Remove", onConfirm: (close) => onRemove(id, close) }
                }
            ]}
            horizontal
        />
        <Features
            features={[
                { name: "Description", content: text },
                { name: "Time", content: mins },

            ]}
            featureProps={{
                flex: true,
                spaceBetween: true,
                alignCenter: true
            }}
        />
    </Card>
)

const TrackedTimeFeed = ({ boothId, filters, itemProps }) => (
    <Container flex alignCenter col className={styles.container}>
        <Component
            filters={filters}
            ItemComponent={FeedItemComponent}
            itemProps={itemProps}
        />
    </Container>
)

export default strappedConnected(
    TrackedTimeFeed,
    {},
    {
        onRemove: (id, callback) => feed.cells.removeEntity.action({ id, callback }),
        refetch: () => feed.cells.fetchFeed.action({ renewStream: true }),
    },
    ({ dedicatedTimeId, onRemove, refetch }) => ({
        filters: useMemo(() => ({
            dedicatedTimeId,
        }), []),
        itemProps: useMemo(() => ({
            onRemove: useCallback((id, close) => onRemove(id, () => {
                close()
                refetch()
            }), [onRemove, refetch])
        }), [onRemove]),
    })
)