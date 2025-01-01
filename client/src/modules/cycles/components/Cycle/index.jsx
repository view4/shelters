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

const Cycle = ({ cycle, boothId, fetch }) => {
    const gateways = useMemo(() => (CYCLE_GATEWAY_KEYS.map(key => <CycleGatewayCard boothId={boothId} cycleId={cycle?.id} orderKey={key} />)), [cycle?.id, boothId])

    if (!cycle) return <ActivateNewCycleButton callback={() => fetch({ boothId })} />;
    return (
        <Container className={styles.container}>
            {gateways}
        </Container>
    )
};

export default withFocusedBoothId(strappedConnected(
    Cycle,
    {
        cycle: feed.cells.fetchEntity.selector,
        isLoading: feed.cells.fetchEntity.selectors.getIsLoading
    },
    { fetch: feed.cells.fetchEntity.action },
    ({ boothId, fetch, }) => {
        useOnLoad(
            () => fetch({ boothId }),
            Boolean(boothId),
            [boothId]
        )
    }
));