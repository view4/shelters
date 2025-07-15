import { useMemo } from "react"
import Container from "modules/Core/components/ui-kit/Container";
import ActivateNewCycleButton from "../ActivateNewCycleButton";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import feed from "modules/cycles/state/feed";
import withFocusedBoothId from "modules/booths/higher-order-components/withFocusedBoothId";
import { useOnLoad } from "modules/Core/hooks/useOnLoad";
import { CYCLE_GATEWAY_KEYS } from "modules/cycles/consts";
import CycleGatewayCard from "../CycleGatewayCard";
import styles from "./styles.module.scss";
import Card from "modules/Core/components/ui-kit/Card";
import withRecursiveRender from "modules/Core/higher-order-components/withRecursiveRender";


const Placeholder = ({ boothId, fetch }) => (
    <Card className={styles.initCard} borderless>
        <ActivateNewCycleButton callback={() => fetch({ boothId })} />
    </Card>
)

export const CycleComponent = ({ cycle, boothId, fetch }) => {
    // const children = useMemo(() => !cycle ? (<Card className={styles.initCard} borderless>  <ActivateNewCycleButton callback={() => fetch({ boothId })} /></Card>) : (CYCLE_GATEWAY_KEYS.map(key => <CycleGatewayCard boothId={boothId} onCreateSuccess={() => fetch({ boothId })} cycleId={cycle?.id} orderKey={key} />)), [cycle?.id, boothId])
    const children = useMemo(() => CYCLE_GATEWAY_KEYS.map(key => (
        <CycleGatewayCard boothId={boothId} onCreateSuccess={() => fetch({ boothId })} cycleId={cycle?.id} orderKey={key} gatewayId={cycle?.[key]?.id} />
    )), [boothId, fetch, cycle])
    // console.log("children", children)
    return (
        <Container className={styles.container}>
            {children}
        </Container>
    )
};

export default withFocusedBoothId(strappedConnected(
    withRecursiveRender({ ['cycle']: CycleComponent, ['placeholder']: Placeholder }),
    {
        cycle: feed.cells.fetchEntity.selector,
        isLoading: feed.cells.fetchEntity.selectors.getIsLoading
    },
    { fetch: feed.cells.fetchEntity.action },
    ({ boothId, fetch, cycle, isLoading }) => {
        useOnLoad(
            () => fetch({ boothId }),
            Boolean(boothId),
            [boothId]
        )
        return {
            cycle,
            isLoading,
            placeholder: !cycle
        }
    }
));