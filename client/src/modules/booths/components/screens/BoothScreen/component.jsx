import Container from "modules/Core/components/ui-kit/Container"
import BoothInfo from "../../BoothInfo";
// import ActivateBoothButton from "../../ActivateBoothButton";
// import DedicatedTimeFeed from "modules/timetracker/components/DedicatedTimeFeed";
import BoothEntriesTab from "../../BoothEntriesTab";
// import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
// import Title from "modules/Core/components/ui-kit/Title";
// import feed from "modules/booths/state/feed";
import BoothPastCyclesTab from "../../BoothPastCyclesTab";
import BoothActiveCycleTab from "../../BoothActiveCycletab";
import BoothScheduleTab from "../../BoothScheduleTab";
import BoothScreen from "modules/shelter/components/BoothScreen";
import styles from "./styles.module.scss";
import EntriesFeed from "modules/entries/components/EntriesFeed";
import AddEntryButton from "modules/entries/components/AddEntryButton";
import Card from "modules/Core/components/ui-kit/Card";
import Cycle from "modules/cycles/components/Cycle";
import RoadmapsFeed from "modules/roadmaps/components/RoadmapsFeed";
import AddRoadmapButton from "modules/roadmaps/components/AddRoadmapButton";


const tabs = [
    {
        title: 'Active Cycle',
        Component: BoothActiveCycleTab
    },
    {
        title: 'Info',
        Component: () => <BoothInfo />
    },
    {
        title: 'Schedule',
        Component: () => <BoothScheduleTab />
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

//     return (
//         <Container flex column alignCenter>
//             <AddRoadmapButton boothId={boothId} />
//             <RoadmapsFeed boothId={boothId} />
//         </Container>
//     )
// });


// const RightPanel = () => {
//     return (
//         <Container flex column alignCenter maxWidth>
//             <ActivateBoothButton />
//         </Container>
//     )
// };

// const BoothName = strappedConnected(
//     Title,
//     {
//         text: (state, { id }) => feed.cells.fetchEntity.selectField(id, "name")(state)
//     },
//     {},
//     ({ text }) => ({})
// )

export default ({ activeBoothId, id }) => (
    <BoothScreen
        // contentHeader={
        //     // <Container className={styles.headerContent} flex maxHeight alignCenter >
        //     //     <DedicatedTimeFeed className={styles.feed} />
        //     // </Container>
        // }
        tripanel
        boothId={id ?? activeBoothId}
    >
        <Container className={styles.container}>

            <Card>
                <BoothScheduleTab initialView='day' p1 maxWidth maxHeight />
            </Card>
            <Card>
                <Container maxWidth maxHeight p1>
                    <Cycle />
                </Container>
            </Card>
            <Card>
                <Container p1 maxWidth maxHeight>
                    <RoadmapsFeed boothId={id ?? activeBoothId} />
                    <AddRoadmapButton boothId={id ?? activeBoothId} />
                </Container>

            </Card>
            <Card>
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
