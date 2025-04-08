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
import withFocusedBoothId from "modules/booths/higher-order-components/withFocusedBoothId";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import cFeed from "modules/cycles/state/feed";
import CyclesFeed from "modules/cycles/components/CyclesFeed";
import Button from "modules/Core/components/ui-kit/Button";
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

const ProspectiveCyclesComponent = ({ boothId, createForthcomingCycle }) => (
    <Container className={styles.drawerContainer} p3>
        <CyclesFeed className={styles.cyclesFeed} boothId={boothId} isForthcoming={true} />
        <Card borderless>
            <Button className={styles.addCycleButton} onClick={createForthcomingCycle}>
                Add Cycle
            </Button>
        </Card>
    </Container>
)

const ProspectiveCycles = withFocusedBoothId(strappedConnected(
    ProspectiveCyclesComponent,
    {},
    { refetchFeed: () => cFeed.cells.fetchFeed.action({ renewStream: true }), createForthcomingCycle: (boothId, callback) => cFeed.cells.createEntity.action({ input: { activateCycle: false, boothId }, callback }) },
    ({ createForthcomingCycle, boothId, refetchFeed, }) => {
        return {
            createForthcomingCycle: () => createForthcomingCycle(boothId, refetchFeed)
        }
    }
))

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
        Component: ProspectiveCycles
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
