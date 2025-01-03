import Container from "modules/Core/components/ui-kit/Container"
import Screen from "modules/Core/components/ui-kit/Screen"
import TrackTimeButton from "modules/timetracker/components/TrackTimeButton";
import Cycle from "modules/cycles/components/Cycle";
import AddRoadmapButton from "modules/roadmaps/components/AddRoadmapButton";
import BoothInfo from "../../BoothInfo";
import ActivateBoothButton from "../../ActivateBoothButton";
import RoadmapsFeed from "modules/roadmaps/components/RoadmapsFeed";
import withFocusedBoothId from "modules/booths/higher-order-components/withFocusedBoothId";
import DedicatedTimeFeed from "modules/timetracker/components/DedicatedTimeFeed";

const tabs = [
    {
        title: 'Active Cycle',
        Component: () => <Cycle />
    },
    {
        title: 'Info',
        Component: () => <BoothInfo />
    }
];

const LeftPanel = withFocusedBoothId(({ boothId }) => {
    return (
        <Container flex column alignCenter>
            <RoadmapsFeed boothId={boothId} />
            <AddRoadmapButton boothId={boothId} />
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

export default () => (
    <Screen
        contentHeader={
            <Container flex maxHeight alignCenter >
                <DedicatedTimeFeed />
                <TrackTimeButton />
            </Container>
        }
        tripanel
        tabs={tabs}
        LeftPanelComponent={LeftPanel}
        RightPanelComponent={RightPanel}
    >
        Booth Screen
    </Screen>
)
