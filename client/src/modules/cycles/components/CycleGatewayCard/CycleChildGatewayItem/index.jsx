import { useCallback } from "react";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import roadmapsFeedState from "modules/roadmaps/state/feed";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";
import Stamps from "modules/Core/sub-modules/ui-kit/components/Stamps";
import StampGatewayButton from "modules/roadmaps/components/StampGatewayButton";
import { STAMPS } from "modules/Core/consts";
import withShouldRender from "modules/Core/higher-order-components/withShouldRender";
import styles from "./styles.module.scss";

const StampButton = withShouldRender(StampGatewayButton);

const ChildGatewayComponent = ({ gateway, refetchGateway }) => {
    const stamps = [
        gateway?.stamps?.[STAMPS.COMMENCED] && { stamp: "Commenced", timestamp: gateway?.stamps?.[STAMPS.COMMENCED] },
        gateway?.stamps?.[STAMPS.COMPLETED] && { stamp: "Completed", timestamp: gateway?.stamps?.[STAMPS.COMPLETED] }
    ].filter(Boolean);

    return (
        <Container className={styles.childGatewayItem}>
            <Text className={styles.gatewayName}>{gateway?.name}</Text>
            <Container flex alignCenter>
                {stamps.length > 0 && (
                    <Container mr2>
                        <Stamps stamps={stamps} className={styles.stampsContainer} />
                    </Container>
                )}
                <StampButton
                    stampKey={STAMPS.COMMENCED}
                    gatewayId={gateway?.id}
                    text="Stamp Commenced"
                    callback={refetchGateway}
                    shouldRender={!gateway?.stamps?.[STAMPS.COMMENCED]}
                    className={styles.stampButton}
                />
                <StampButton
                    stampKey={STAMPS.COMPLETED}
                    gatewayId={gateway?.id}
                    text="Stamp Completed"
                    callback={refetchGateway}
                    shouldRender={Boolean(gateway?.stamps?.[STAMPS.COMMENCED]) && !gateway?.stamps?.[STAMPS.COMPLETED]}
                    className={styles.stampButton}
                />
            </Container>
        </Container>
    );
};

export default strappedConnected(
    ChildGatewayComponent,
    { gateway: (state, { gatewayId }) => roadmapsFeedState.cells.fetchEntity.selector(gatewayId)(state) },
    {
        refetchGateway: (id) => roadmapsFeedState.cells.fetchEntity.action({ id })
    },
    ({ gateway, refetchGateway }) => ({
        gateway,
        refetchGateway: useCallback(() => refetchGateway(gateway?.id), [refetchGateway, gateway?.id])
    })
)
