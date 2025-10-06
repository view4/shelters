import BoothScreen from "modules/shelter/components/BoothScreen";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import RoadmapsFeed from "modules/roadmaps/components/RoadmapsFeed";
import AddRoadmapButton from "modules/roadmaps/components/AddRoadmapButton";
import DedicatedTimeFeed from "modules/timetracker/components/DedicatedTimeFeed";
import BoothScheduleTab from "../BoothScheduleTab";
import BoothEntriesTab, { SearchComponent } from "../BoothEntriesTab";
import BoothActiveCycletab from "../BoothActiveCycletab";
import BoothInfo from "../BoothInfo";
import Card from "modules/Core/sub-modules/ui-kit/components/Card";
import FeatureWrapper from "modules/Core/components/FeatureWrapper";
import BoothPastCyclesTab from "../BoothPastCyclesTab";
import BoothProspectiveCycles from "../BoothProspectiveCycles";
import BoothsScreenHeader from "modules/shelter/components/BoothScreen/BoothScreenHeader";
import { ENTRIES, ROADMAPS, TIME_MAPPING, CYCLES } from "../InfoComponent/lib/keys";
import styles from "./styles.module.scss";

export const BoothRoadmapsScreen = ({ boothId }) => {
    return (
        <BoothScreen boothId={boothId}>
            <BoothsScreenHeader
                className={styles.header}
                header="Roadmaps"
                infoKey={ROADMAPS.index}
            />
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
            <BoothsScreenHeader
                className={styles.header}
                header="Dedicated Time"
                infoKey={TIME_MAPPING.index}
            />
            <Card borderless >
                <FeatureWrapper featureKey="time-mappingxx" >
                    <Container className={styles.mappedTimeContainer}>
                        <BoothScheduleTab maxHeight />
                    </Container>
                </FeatureWrapper>
                <Container flex col maxWidth >
                    <DedicatedTimeFeed className={styles.dedicatedTimeFeedContainer} boothId={boothId} />
                </Container>
            </Card>
        </BoothScreen>
    )
}

export const BoothEntriesScreen = ({ boothId }) => {
    return (
        <BoothScreen boothId={boothId}>
            <BoothsScreenHeader
                className={styles.header}
                header="Entries"
                infoKey={ENTRIES.index}
                options={[
                    { Component: SearchComponent, props: { className: styles.searchComponent } }
                ]}
            />
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
            <Container maxHeight>
                <BoothsScreenHeader
                    className={styles.header}
                    header="Cycles"
                    infoKey={CYCLES.index}
                />
                <Card
                    className={styles.cyclesCard}
                    tabs={cyclesTabs}
                    lightShadow
                    borderless
                    maxWidth
                /></Container>

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
