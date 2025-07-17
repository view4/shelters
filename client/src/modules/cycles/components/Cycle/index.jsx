import { Fragment, useMemo } from "react"
import Container from "modules/Core/components/ui-kit/Container";
import ActivateNewCycleButton from "../ActivateNewCycleButton";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import withFocusedBoothId from "modules/booths/higher-order-components/withFocusedBoothId";
import { useOnLoad } from "modules/Core/hooks/useOnLoad";
import { CYCLE_GATEWAY_KEYS } from "modules/cycles/consts";
import CycleGatewayCard from "../CycleGatewayCard";
import Card from "modules/Core/components/ui-kit/Card";
import withRecursiveRender from "modules/Core/higher-order-components/withRecursiveRender";
import state from "modules/cycles/state";
import styles from "./styles.module.scss";

const Placeholder = ({ boothId, fetch }) => (
    <Card className={styles.initCard} borderless>
        <ActivateNewCycleButton callback={() => fetch({ boothId })} />
    </Card>
)

export const CycleComponent = ({ cycle, boothId, fetch }) => {
    const children = useMemo(() => CYCLE_GATEWAY_KEYS.map(key => (
        <CycleGatewayCard
            boothId={boothId}
            onCreateSuccess={() => fetch({ boothId })}
            cycleId={cycle?.id}
            orderKey={key}
            gatewayId={key === "sabbatical" ? cycle?.sabbatical?.gateway?.id : cycle?.[key]?.id ?? null} />
    )), [boothId, fetch, cycle])
    return (
        <Container className={styles.container}>
            {children}
        </Container>
    )
};

export default withFocusedBoothId(strappedConnected(
    withRecursiveRender({ ['cycle']: CycleComponent, ['placeholder']: Placeholder }),
    {
        cycle: state.fetchCycle.selectors.activeCycle,
        isLoading: state.fetchCycle.selectors.isLoading
    },
    { fetch: state.fetchCycle.action },
    ({ boothId, fetch, cycle, isLoading }) => {
        useOnLoad(
            () => fetch({ boothId }),
            Boolean(boothId),
            [boothId]
        )
        console.log("cycle", cycle)
        return {
            cycle,
            isLoading,
            placeholder: !cycle
        }
    }
));