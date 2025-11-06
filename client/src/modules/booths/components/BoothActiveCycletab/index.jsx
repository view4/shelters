import Cycle from "modules/cycles/components/Cycle";
import { useIsOpen } from "modules/Core/hooks/useIsOpen";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import withFocusedBoothId from "modules/booths/higher-order-components/withFocusedBoothId";
import styles from "./styles.module.scss";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import CompleteCycleButton from "modules/cycles/components/CompleteCycleButton";
import cyclesState from "modules/cycles/state";

const BoothActiveCycleTab = strappedConnected(({ refetch, activeCycle }) => {
    const { isOpen, open, close } = useIsOpen();
    return (
        <Container flex column alignCenter maxWidth className={styles.container} relative >
            <Cycle />
            <Container className={styles.actionsContainer} mt1 flex flexEnd >
                <CompleteCycleButton 
                    text="Complete" 
                    cycleId={activeCycle?.id} 
                    callback={refetch} 
                />
            </Container>
        </Container>
    )
},
    {
        activeCycle: cyclesState.fetchCurrentCycle.selectors.activeCycle
    },
    { 
        fetchActiveCycle: cyclesState.fetchCurrentCycle.action
    },
    ({  boothId, fetchActiveCycle }) => {
        return {
            refetch: () => fetchActiveCycle({boothId})
        }
    }

)

export default withFocusedBoothId(BoothActiveCycleTab);