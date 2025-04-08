import { Fragment } from "react";
import Container from "modules/Core/components/ui-kit/Container"
import BoothScheduleTab from "../../BoothScheduleTab";
import BoothScreen from "modules/shelter/components/BoothScreen";
import styles from "./styles.module.scss";
import EntriesFeed from "modules/entries/components/EntriesFeed";
import AddEntryButton from "modules/entries/components/AddEntryButton";
import Card from "modules/Core/components/ui-kit/Card";
import Cycle from "modules/cycles/components/Cycle";
import RoadmapsFeed from "modules/roadmaps/components/RoadmapsFeed";
import AddRoadmapButton from "modules/roadmaps/components/AddRoadmapButton";

export default ({ activeBoothId, id }) => (
    <BoothScreen
        tripanel
        boothId={id ?? activeBoothId}
        RightPanelComponent={Fragment}
    >
        <Container className={styles.container}>
            <Card className={styles.card}>
                <BoothScheduleTab initialView='day' p1 maxWidth maxHeight />
            </Card>
            <Card className={styles.card}>
                <Container maxWidth maxHeight p1>
                    <Cycle />
                </Container>
            </Card>
            <Card className={styles.card}>
                <Container p1 maxWidth maxHeight>
                    <RoadmapsFeed boothId={id ?? activeBoothId} />
                    <AddRoadmapButton boothId={id ?? activeBoothId} />
                </Container>

            </Card>
            <Card className={styles.card}>
                <Container p1 maxWidth maxHeight>
                    <EntriesFeed boothId={id ?? activeBoothId} />
                    <Card>
                        <AddEntryButton boothId={id ?? activeBoothId} />
                    </Card>
                </Container>
            </Card>
        </Container>
    </BoothScreen>
)
