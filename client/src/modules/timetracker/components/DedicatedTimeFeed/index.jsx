import cx from "classnames";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import feed from "modules/timetracker/state/feed";
import { useMemo } from "react";
import AllocateTimeButton from "../AllocateTimeButton";
import Card from "modules/Core/sub-modules/ui-kit/components/Card";
import Features from "modules/Core/sub-modules/ui-kit/components/Features";
import ExpandableOptions from "modules/Core/sub-modules/ui-kit/components/ExpandableOptions";
import Feed from "modules/Core/components/Feed";
import Feature from "modules/Core/sub-modules/ui-kit/components/Feature";
import RedirectButton from "modules/Core/sub-modules/ui-kit/components/RedirectButton";
import ProgressBar from "modules/Core/sub-modules/ui-kit/components/ProgressBar";
import TrackTimeButton from "modules/timetracker/submodules/trackedTime/components/TrackTimeButton";
import styles from "./styles.module.scss";
import strapped from "modules/Core/higher-order-components/strapped";

const Component = feed.FeedComponent;

export const DedicatedTimeOptions = strapped(
    ExpandableOptions,
    ({ onTrackTimeSuccess, id, parentId, name, text, mins }) => ({
        onTrackTimeSuccess,
        horizontal: true,
        options: useMemo(() => [
            {
                Component: TrackTimeButton,
                props: {
                    dedicatedTimeId: id,
                    onSuccess: onTrackTimeSuccess,
                    dedicatedTimeName: name,
                    text: "Track"
                }
            },
            {
                Component: RedirectButton,
                props: {
                    text: 'View',
                    to: `/tracked-times/${id}`
                }
            },
            {
                Component: AllocateTimeButton,
                props: {
                    parentId,
                    id,
                    text: "Edit",
                    initialState: {
                        name,
                        text,
                        hours: mins / 60
                    }
                }
            }
        ], [
            id,
            parentId,
            name,
            text,
            mins
        ])
    })
);

const ChildFeedItemOptions = strappedConnected(
    DedicatedTimeOptions,
    {},
    {
        onTrackTimeSuccess: () => feed.cells.fetchFeed.action({ renewStream: true })
    },
    ({ }) => ({})
)



const ChildFeedItem = ({ name, mins, text, trackedTime, id, parentId }) => (
    <Feature
        name={name}
        className={styles.childItem}
        row
        renderContent={() => (
            <Container maxWidth flex row flexEnd>
                <Container>
                    <ChildFeedItemOptions
                        id={id}
                        parentId={parentId}
                        mins={mins}
                        text={text}
                        name={name}
                        openClassName={styles.openChildOptions}
                    />

                </Container>
                <Container>
                    {trackedTime} / {mins} mins
                </Container>
            </Container>
        )}
    />
)

export const TrackedTimeFeatures = ({ trackedTime, totalMins, }) =>
    <Features
        features={[
            { name: "Total Fulfilled Time", content: `${(trackedTime / 60).toFixed(2)}hrs` },
            { name: "Total Time", content: `${(totalMins / 60).toFixed(2)}hrs` },

            {
                jsx: <Container className={styles.progressContainer} flex row fullWidth>
                    <ProgressBar min={trackedTime} max={totalMins} />
                </Container>
            }

        ]}

        className={styles.features}
        featureProps={{
            flex: true,
            spaceBetween: true,
            alignCenter: true
        }}
    />

export const FeedItemComponent = ({
    name,
    trackedTime,
    mins,
    totalMins,
    children,
    id,
    onClick,
    className,
    headerChildren
}) => (
    <Card
        className={cx(styles.container, className)}
        header={name}
        onClick={onClick}
        headerProps={{
            children: headerChildren ? headerChildren :
                <ExpandableOptions
                    options={[
                        {
                            Component: AllocateTimeButton, props: { parentId: id }
                        }
                    ]}
                    horizontal
                />,
            className: styles.header
        }}
    >
        <Feed.Component
            feed={children}
            ItemComponent={ChildFeedItem}
        />
        <TrackedTimeFeatures trackedTime={trackedTime} totalMins={totalMins} />
    </Card>
)

const DedicatedTimeFeed = ({ boothId, filters, className, ...props }) => (
    <Container className={cx(className, styles.feedContainer)} flex alignCenter maxHeight {...props}>
        <Component
            filters={filters}
            ItemComponent={FeedItemComponent}
        />
        <AllocateTimeButton boothId={boothId} />
    </Container>
)

export default strappedConnected(
    DedicatedTimeFeed,
    {},
    {},
    ({ boothId }) => ({
        filters: useMemo(() => ({
            boothId,
            parentId: null,
        }), [boothId]),
    })
)