import withFocusedBoothId from "modules/booths/higher-order-components/withFocusedBoothId";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import cFeed from "modules/cycles/state/feed";
import CyclesFeed from "modules/cycles/components/CyclesFeed";
import Button from "modules/Core/components/ui-kit/Button";
import Container from "modules/Core/components/ui-kit/Container";
import Card from "modules/Core/components/ui-kit/Card";
import styles from "./styles.module.scss";


const ProspectiveCycles = ({ boothId, createForthcomingCycle }) => (
    <Container className={styles.drawerContainer} p3>
        <CyclesFeed className={styles.cyclesFeed} boothId={boothId} isForthcoming={true} displayFocus />
        <Card borderless>
            <Button className={styles.addCycleButton} onClick={createForthcomingCycle}>
                Add Cycle
            </Button>
        </Card>
    </Container>
)

export default withFocusedBoothId(strappedConnected(
    ProspectiveCycles,
    {},
    { refetchFeed: () => cFeed.cells.fetchFeed.action({ renewStream: true }), createForthcomingCycle: (boothId, callback) => cFeed.cells.createEntity.action({ input: { activateCycle: false, boothId }, callback }) },
    ({ createForthcomingCycle, boothId, refetchFeed, }) => {
        return {
            createForthcomingCycle: () => createForthcomingCycle(boothId, refetchFeed)
        }
    }
))
