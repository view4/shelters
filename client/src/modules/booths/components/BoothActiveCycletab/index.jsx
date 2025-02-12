import Cycle from "modules/cycles/components/Cycle";
import Drawer from "modules/Core/components/ui-kit/Drawer";
import Button from "modules/Core/components/ui-kit/Button";
import { useIsOpen } from "modules/Core/hooks/useIsOpen";
import CyclesFeed from "modules/cycles/components/CyclesFeed";
import Card from "modules/Core/components/ui-kit/Card";
import Container from "modules/Core/components/ui-kit/Container";
import cFeed from "modules/cycles/state/feed";
import withFocusedBoothId from "modules/booths/higher-order-components/withFocusedBoothId";
import styles from "./styles.module.scss";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";

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

export default withFocusedBoothId(BoothActiveCycleTab);