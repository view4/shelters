import withFocusedBoothId from "modules/booths/higher-order-components/withFocusedBoothId";
import Container from "modules/Core/components/ui-kit/Container";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import feed from "modules/timetracker/state/feed";
import { useMemo } from "react";
import AllocateTimeButton from "../AllocateTimeButton";
import Card from "modules/Core/components/ui-kit/Card";
import Features from "modules/Core/components/ui-kit/Features";
import ExpandableOptions from "modules/Core/components/ui-kit/ExpandableOptions";
import Feed from "modules/Core/components/Feed";
import Feature from "modules/Core/components/ui-kit/Feature";
import RedirectButton from "modules/Core/components/ui-kit/RedirectButton";

const Component = feed.FeedComponent;

const ChildFeedItem = ({ name, mins, trackedTime, id, parentId }) => (
    <Feature
        name="Child Feed Item"
        renderContent={() => (
            <Container maxWidth flex row spaceBetween>
                <Container>
                    mins: {mins}
                </Container>
                <Container>
                    <ExpandableOptions
                        options={[
                            {
                                Component: RedirectButton,
                                props: {
                                    text: 'View Tracked Times',
                                    to: `./tracked-times/${id}`
                                }
                            },
                            {
                                Component: AllocateTimeButton,
                                props: {
                                    parentId,
                                    id,
                                    text: "Edit"
                                }
                            }
                        ]}
                    />
                </Container>

            </Container>
        )}
    />
)

const FeedItemComponent = ({
    name,
    trackedTime,
    mins,
    totalMins,
    children,
    id
}) => (
    <Card header={name}>
        <ExpandableOptions
            options={[
                {
                    Component: AllocateTimeButton, props: { parentId: id }
                }
            ]}
        />
        <Feed.Component feed={children} ItemComponent={ChildFeedItem} />
        <Features
            features={[
                { name: "Total Time", content: `${totalMins / 60}hrs` },
                { name: "Total Fulfilled Time", content: `${trackedTime / 60}hrs` },

                { name: "", content: "Progress Bar here" }

            ]}
            featureProps={{
                flex: true,
                spaceBetween: true,
                alignCenter: true
            }}
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