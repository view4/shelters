import { useMemo } from "react"
import Container from "modules/Core/components/ui-kit/Container";
import ActivateNewCycleButton from "../ActivateNewCycleButton";
import { CYCLE_GATEWAY_KEYS } from "modules/cycles/consts";
import CycleGatewayCard from "../CycleGatewayCard";
import Card from "modules/Core/components/ui-kit/Card";
import styles from "./styles.module.scss";

export const Placeholder = ({ boothId, fetch }) => (
    <Card className={styles.initCard} borderless>
        <ActivateNewCycleButton callback={() => fetch({ boothId })} />
    </Card>
)

export default ({ cycle, boothId, fetch }) => {
    const children = useMemo(() => CYCLE_GATEWAY_KEYS.map(key => (
        <CycleGatewayCard
            boothId={boothId}
            onCreateSuccess={() => fetch({ boothId })}
            cycleId={cycle?.id}
            orderKey={key}
            gatewayId={key === "sabbatical" ? cycle?.sabbatical?.gateway?.id : cycle?.[key]?.id ?? null} />
    )), [boothId, fetch, cycle]);
    return (
        <Container className={styles.container}>
            {children}
        </Container>
    )
};
