import { Fragment } from "react";
import Container from "modules/Core/components/ui-kit/Container"
import BoothScheduleTab from "../../BoothScheduleTab";
import BoothScreen from "modules/shelter/components/BoothScreen";
import EntriesFeed from "modules/entries/components/EntriesFeed";
import AddEntryButton from "modules/entries/components/AddEntryButton";
import Cycle from "modules/cycles/components/Cycle";
import RoadmapsFeed from "modules/roadmaps/components/RoadmapsFeed";
import AddRoadmapButton from "modules/roadmaps/components/AddRoadmapButton";
import styles from "./styles.module.scss";
import IntrospectionCard from "../../IntrospectionCard";


export default ({ focusedBoothId, id }) => (
    <BoothScreen
        tripanel
        boothId={id ?? focusedBoothId}
        RightPanelComponent={Fragment}
    >
        <Container className={styles.container}>
            <IntrospectionCard title="Schedule" className={styles.card}>
                <BoothScheduleTab initialView='day' p1 maxWidth maxHeight />
            </IntrospectionCard>
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
                <EntriesFeed boothId={id ?? focusedBoothId} />
                <AddEntryButton className={styles.entriesButton} boothId={id ?? focusedBoothId} />
            </IntrospectionCard>
        </Container>
    </BoothScreen>
)
