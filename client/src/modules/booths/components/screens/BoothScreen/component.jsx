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
import IntospectionCard from "../../IntospectionCard";


export default ({ activeBoothId, id }) => (
    <BoothScreen
        tripanel
        boothId={id ?? activeBoothId}
        RightPanelComponent={Fragment}
    >
        <Container className={styles.container}>
            <IntospectionCard title="Schedule" className={styles.card}>
                <BoothScheduleTab initialView='day' p1 maxWidth maxHeight />
            </IntospectionCard>
            <IntospectionCard className={styles.card} title="Cycle" maxWidth maxHeight>
                <Cycle />
            </IntospectionCard>
            <IntospectionCard className={styles.card} title="Roadmaps" maxWidth maxHeight>
                <Container maxWidth maxHeight flex col alignCenter>
                <RoadmapsFeed boothId={id ?? activeBoothId} />
                <AddRoadmapButton boothId={id ?? activeBoothId} />
                </Container>
            </IntospectionCard>
            <IntospectionCard className={styles.card} title="Entries" maxWidth maxHeight>
                <EntriesFeed boothId={id ?? activeBoothId} />
                <AddEntryButton className={styles.entriesButton} boothId={id ?? activeBoothId} />
            </IntospectionCard>
        </Container>
    </BoothScreen>
)
