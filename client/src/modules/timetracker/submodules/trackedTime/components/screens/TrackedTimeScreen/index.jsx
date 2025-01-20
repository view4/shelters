import { useCallback, useMemo } from "react";
import Card from "modules/Core/components/ui-kit/Card";
import Container from "modules/Core/components/ui-kit/Container";
import Screen from "modules/Core/components/ui-kit/Screen"
import Title from "modules/Core/components/ui-kit/Title";
import allocateTimeFeed from "modules/timetracker/state/feed";
import feed from "modules/timetracker/submodules/trackedTime/state/feed";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected"
import TrackedTimeFeed from "modules/timetracker/submodules/trackedTime/components/TrackedTimeFeed";
import Text from "modules/Core/components/ui-kit/Text";
import { useOnLoad } from "modules/Core/hooks/useOnLoad";
import { DedicatedTimeOptions, TrackedTimeFeatures } from "modules/timetracker/components/DedicatedTimeFeed";
import styles from "./styles.module.scss";

const TrackedTimeScreen = ({ dedicatedTimeId, tabs, onTrackTimeSuccess, entity, }) => (
    <Screen
        header={"View Tracked Time"}
        contentHeader={
            <Card className={styles.card}>
                <Container>
                    <Title>{entity?.name}</Title>
                    <Text>{entity?.text}</Text>
                </Container>
                <TrackedTimeFeatures trackedTime={entity?.trackedTime} totalMins={entity?.mins} />
                <Container>
                    <DedicatedTimeOptions
                        onTrackTimeSuccess={onTrackTimeSuccess}
                        name={entity?.name}
                        text={entity?.text}
                        mins={entity?.mins}
                        id={dedicatedTimeId}
                    />
                </Container>
            </Card>
        }
        back={{ to: "/", text: "Back" }}
        tabs={tabs}
    />
)


export default strappedConnected(
    TrackedTimeScreen,
    {
        entity: (state, { dedicatedTimeId }) => allocateTimeFeed.cells.fetchEntity.selector(dedicatedTimeId)(state),
    },
    {
        onLoad: (dedicatedTimeId) => allocateTimeFeed.cells.fetchEntity.action({ id: dedicatedTimeId }),
        refetchFeed: () => feed.cells.fetchFeed.action({ renewStream: true })
    },
    ({ dedicatedTimeId, entity, onLoad, refetchFeed }) => {
        useOnLoad(
            () => onLoad(dedicatedTimeId),
            Boolean(dedicatedTimeId && !entity?.name),
            [dedicatedTimeId]
        )
        return ({
            tabs: useMemo(() => [
                {
                    title: 'Tracked Time',
                    Component: () => (
                        <Container className={styles.feedContainer}>
                            <TrackedTimeFeed dedicatedTimeId={dedicatedTimeId} />
                        </Container>
                    )
                }
            ], [dedicatedTimeId]),
            onTrackTimeSuccess: useCallback(() => {
                onLoad(dedicatedTimeId)
                refetchFeed()
            }, [dedicatedTimeId, onLoad, refetchFeed])
        })
    }
);