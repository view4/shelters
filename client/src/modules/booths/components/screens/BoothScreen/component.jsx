import Container from "modules/Core/components/ui-kit/Container"
import Screen from "modules/Core/components/ui-kit/Screen"
import Cycle from "modules/cycles/components/Cycle";
import AddRoadmapButton from "modules/roadmaps/components/AddRoadmapButton";
import BoothInfo from "../../BoothInfo";
import ActivateBoothButton from "../../ActivateBoothButton";
import RoadmapsFeed from "modules/roadmaps/components/RoadmapsFeed";
import withFocusedBoothId from "modules/booths/higher-order-components/withFocusedBoothId";
import DedicatedTimeFeed from "modules/timetracker/components/DedicatedTimeFeed";
import BoothEntriesTab from "../../BoothEntriesTab";
import styles from "./styles.module.scss";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import Title from "modules/Core/components/ui-kit/Title";
import feed from "modules/booths/state/feed";
import cFeed from "modules/cycles/state/feed";
import BoothPastCyclesTab from "../../BoothPastCyclesTab";
import Drawer from "modules/Core/components/ui-kit/Drawer";
import Button from "modules/Core/components/ui-kit/Button";
import { useIsOpen } from "modules/Core/hooks/useIsOpen";
import CyclesFeed from "modules/cycles/components/CyclesFeed";
import Card from "modules/Core/components/ui-kit/Card";
import { SelectableGatewayFeedItem } from "modules/roadmaps/components/RoadmapFeedItem";


const BoothActiveCycleTab = strappedConnected(({ createForthcomingCycle, boothId }) => {
    const { isOpen, open, close } = useIsOpen();
    return (
        <Container flex column alignCenter maxWidth className={styles.container} relative >
            <Cycle />
            <Button onClick={open}>
                View Upcoming Cycles
            </Button>
            <Drawer header={"Upcoming Cycles"} isOpen={isOpen} close={close}>
                <Container className={styles.drawerContainer} p3>
                    <CyclesFeed className={styles.cyclesFeed} boothId={boothId} isForthcoming={true} />
                    <Card borderless>
                        <Button className={styles.addCycleButton} onClick={createForthcomingCycle}>
                            Add Cycle
                        </Button>
                    </Card>
                </Container>
            </Drawer>
        </Container>
    )
},
    {},
    { refetchFeed: () => cFeed.cells.fetchFeed.action({ renewStream: true }), createForthcomingCycle: (boothId, callback) => cFeed.cells.createEntity.action({ input: { activateCycle: false, boothId }, callback }) },
    ({ createForthcomingCycle, boothId, refetchFeed, }) => {
        return {
            createForthcomingCycle: () => createForthcomingCycle(boothId, refetchFeed)
        }
    }

)
const tabs = [
    {
        title: 'Active Cycle',
        Component: withFocusedBoothId(BoothActiveCycleTab)
    },
    {
        title: 'Info',
        Component: () => <BoothInfo />
    },
    {
        title: 'Entries',
        Component: () => <BoothEntriesTab />
    },
    {
        title: 'Past Cycles',
        Component: () => <BoothPastCyclesTab />
    },
];

const LeftPanel = withFocusedBoothId(({ boothId }) => {
    return (
        <Container flex column alignCenter>
            <AddRoadmapButton boothId={boothId} />
            <RoadmapsFeed boothId={boothId} />
        </Container>
    )
});

export const CyclelessGatewaysFeed = withFocusedBoothId(({boothId, onSelect}) => 
    <RoadmapsFeed 
        ItemComponent={SelectableGatewayFeedItem}  
        boothId={boothId} 
        isCycleless 
        itemProps={{ onSelect }}
    />
)

const RightPanel = () => {
    return (
        <Container flex column alignCenter maxWidth>
            <ActivateBoothButton />
        </Container>
    )
};

const BoothName = strappedConnected(
    Title,
    {
        text: (state, { id }) => feed.cells.fetchEntity.selectField(id, "name")(state)
    },
    {},
    ({ text }) => ({})
)

export default ({ activeBoothId, id }) => (
    <Screen
        contentHeader={
            <Container className={styles.headerContent} flex maxHeight alignCenter >
                <DedicatedTimeFeed className={styles.feed} />
            </Container>
        }
        tripanel
        header={<BoothName id={id ?? activeBoothId} />}
        tabs={tabs}
        LeftPanelComponent={LeftPanel}
        RightPanelComponent={RightPanel}
    />
)
