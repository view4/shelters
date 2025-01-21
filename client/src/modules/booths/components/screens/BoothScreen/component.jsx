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
import BoothPastCyclesTab from "../../BoothPastCyclesTab";

const tabs = [
    {
        title: 'Active Cycle',
        Component: () => <Cycle />
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
})

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
