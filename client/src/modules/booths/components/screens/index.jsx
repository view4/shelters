import BoothScreen from "modules/shelter/components/BoothScreen";
import Container from "modules/Core/components/ui-kit/Container";
import RoadmapsFeed from "modules/roadmaps/components/RoadmapsFeed";
import AddRoadmapButton from "modules/roadmaps/components/AddRoadmapButton";
import DedicatedTimeFeed from "modules/timetracker/components/DedicatedTimeFeed";
import BoothScheduleTab from "../BoothScheduleTab";
import BoothEntriesTab from "../BoothEntriesTab";
import BoothActiveCycletab from "../BoothActiveCycletab";
import BoothInfo from "../BoothInfo";
import Card from "modules/Core/components/ui-kit/Card";
import BoothPastCyclesTab from "../BoothPastCyclesTab";
import BoothProspectiveCycles from "../BoothProspectiveCycles";
import styles from "./styles.module.scss";

export const BoothRoadmapsScreen = ({ boothId }) => {
    return (
        <BoothScreen boothId={boothId}>
            <Container maxHeight maxWidth column alignCenter flex >
                <RoadmapsFeed boothId={boothId} />
                <AddRoadmapButton boothId={boothId} />
            </Container>
        </BoothScreen>
    )
}

export const BoothDedicatedTimeScreen = ({ boothId }) => {
    return (
        <BoothScreen boothId={boothId}>
            <Card maxHeight>
                <Container flex row alignCenter maxWidth>
                    <DedicatedTimeFeed boothId={boothId} />
                </Container>
                <BoothScheduleTab />
            </Card>

        </BoothScreen>
    )
}

export const BoothEntriesScreen = ({ boothId }) => {
    return (
        <BoothScreen boothId={boothId}>
            <BoothEntriesTab boothId={boothId} />
        </BoothScreen>
    )
}

const cyclesTabs = [
    {
        title: 'Active Cycle',
        Component: BoothActiveCycletab
    },
    {
        title: 'Past Cycles',
        Component: BoothPastCyclesTab
    },
    {
        title: 'Prospective Cycles',
        Component: BoothProspectiveCycles
    }
];

export const BoothCyclesScreen = ({ boothId }) => {
    return (
        <BoothScreen boothId={boothId}>
            <Card className={styles.cyclesCard} tabs={cyclesTabs} maxHeight lightShadow maxWidth/>
        </BoothScreen>
    )
}

export const BoothInfoScreen = ({ boothId }) => {
    return (
        <BoothScreen boothId={boothId}>
            <Container flex row alignCenter maxWidth>
                <BoothInfo boothId={boothId} />
            </Container>
        </BoothScreen>
    )
}
