import { Fragment, useMemo } from "react";
import Container from "modules/Core/sub-modules/ui-kit/components/Container"
import BoothScheduleTab from "../../BoothScheduleTab";
import BoothScreen from "modules/shelter/components/BoothScreen";
import EntriesFeed from "modules/entries/components/EntriesFeed";
import AddEntryButton from "modules/entries/components/AddEntryButton";
import Cycle from "modules/cycles/components/Cycle";
import RoadmapsFeed from "modules/roadmaps/components/RoadmapsFeed";
import AddRoadmapButton from "modules/roadmaps/components/AddRoadmapButton";
import IntrospectionCard from "../../IntrospectionCard";
import Card from "modules/Core/sub-modules/ui-kit/components/Card";
import DedicatedTimeFeed from "modules/timetracker/components/DedicatedTimeFeed";
import styles from "./styles.module.scss";

const tabs = [
    {
        title: "Time schedule",
        Component: ({ boothId }) => <BoothScheduleTab initialView='day' p1 maxWidth maxHeight borderless boothId={boothId} />
    },
    {
        title: 'Dedicated times',
        Component: ({ boothId }) => (
            <Container flex col alignCenter maxWidth>
                <DedicatedTimeFeed col className={styles.dedicatedTimeFeedContainer} boothId={boothId} />
            </Container>
        )
    }

]

const BoothTimeIntrospectionCard = ({ boothId, ...props }) => {
    const tabProps = useMemo(() => ({ boothId }), [boothId])
    return (
        <IntrospectionCard title="Time schedule" className={styles.card} {...props}>
            <Card maxHeight borderless tabs={tabs} tabProps={tabProps} />
        </IntrospectionCard>
    )
}

export default ({ focusedBoothId, id }) => (
    <BoothScreen
        tripanel
        boothId={id ?? focusedBoothId}
        RightPanelComponent={Fragment}
    >
        <Container className={styles.container}>
            <BoothTimeIntrospectionCard boothId={id ?? focusedBoothId} />
            <IntrospectionCard className={styles.card} title="Cycle" maxWidth maxHeight>
                <Cycle />
            </IntrospectionCard>
            <IntrospectionCard className={styles.card} title="Roadmaps" maxWidth maxHeight>
                <Container maxWidth maxHeight flex col alignCenter>
                    <RoadmapsFeed boothId={id ?? focusedBoothId} />
                    <AddRoadmapButton boothId={id ?? focusedBoothId} />
                </Container>
            </IntrospectionCard>
            <IntrospectionCard className={styles.card} title="Entries" maxWidth maxHeight>
                <AddEntryButton className={styles.entriesButton} boothId={id ?? focusedBoothId} />
                <EntriesFeed boothId={id ?? focusedBoothId} />
            </IntrospectionCard>
        </Container>
    </BoothScreen>
)
