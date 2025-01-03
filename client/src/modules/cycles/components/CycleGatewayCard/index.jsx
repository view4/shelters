import { useCallback, useMemo } from "react"
import { useDispatch } from "react-redux";
import cx from "classnames";
import ExpandableCard from "modules/Core/components/ui-kit/Card/ExpandableCard";
import Container from "modules/Core/components/ui-kit/Container";
import Button from 'modules/Core/components/ui-kit/Button';
import withRecursiveRender from "modules/Core/higher-order-components/withRecursiveRender";
import Card from "modules/Core/components/ui-kit/Card";
import AddGatewayButton from "modules/roadmaps/components/AddGatewayButton";
import Text from "modules/Core/components/ui-kit/Text";
import cells from "modules/cycles/state";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import feed from "modules/cycles/state/feed";
import { DownArrow, UpArrow } from "modules/Core/components/ui-kit/indicators";
import { CYCLE_GATEWAY_KEYS } from "modules/cycles/consts";
import StampGatewayButton from "modules/roadmaps/components/StampGatewayButton";
import { STAMPS } from "modules/Core/consts";
import Stamps from "modules/Core/components/ui-kit/Stamps";
import CompleteSabbaticalButton from "modules/sabbaticals/components/CompleteSabbaticalButton";
import EditGatewayButton from "modules/roadmaps/components/EditGatewayButton";
import ExpandableOptions from "modules/Core/components/ui-kit/ExpandableOptions";
import styles from "./styles.module.scss";


const Component = ({ gateway, children, refetch, remove }) => {
    console.log(gateway)
    const stamps = useMemo(() => Object.entries(gateway?.stamps ?? {})?.map(([key, value]) => (value && { text: key?.toLowerCase() })), [gateway?.stamps]);

    return (
        <ExpandableCard className={styles.gateway} title={gateway?.name} size={"lg"}>
            <Container relative maxHeight maxWidth>

                <ExpandableOptions
                    className={styles.options}
                    horizontal
                    options={[
                        { text: "Remove", onClick: remove },
                        {
                            Component: EditGatewayButton, props: {
                                values: { ...gateway, },
                                gatewayId: gateway?.id,
                                onSuccess: refetch
                            }
                        }
                    ]}
                />
                {gateway?.text}
                {children}
                <Container flex spaceBetween>
                    <Container>
                        <StampGatewayButton
                            text={"Stamp Commenced"}
                            stampKey={STAMPS.COMMENCED}
                            gatewayId={gateway?.id}
                            callback={refetch}
                            shouldRender={!gateway?.stamps?.[STAMPS.COMMENCED]}
                        />
                        <StampGatewayButton
                            text={"Stamp Completed"}
                            stampKey={STAMPS.COMPLETED}
                            gatewayId={gateway?.id}
                            callback={refetch}
                            shouldRender={!gateway?.stamps?.[STAMPS.COMPLETED] && Boolean(gateway?.stamps?.[STAMPS.COMMENCED])}
                        />
                    </Container>
                    <Container>
                        <Stamps stamps={stamps} />
                    </Container>
                </Container>
            </Container>

        </ExpandableCard>
    )
};

const EmptyGatewayCard = ({ cycleId, orderKey }) => {
    const dispatch = useDispatch();
    const onSuccess = useCallback((result) => {
        dispatch(cells.addGatewayToActiveCycle.action({ gatewayId: result.id, orderKey }))
    }, []);
    return (
        <Card className={styles.emptyCard}>
            <Container flex spaceBetween alignCenter >
                <Text>Empty</Text>
                <AddGatewayButton
                    cycleId={cycleId}
                    onSuccess={onSuccess}
                />
            </Container>
        </Card>
    )
};

const SabbaticalGatewayCard = ({ gateway, refetch }) => (
    <Component gateway={gateway.gateway} refetch={refetch}>
        <Container maxWidth flex alignCenter p1>
            <CompleteSabbaticalButton
                shouldRender={Boolean(gateway?.gateway?.stamps?.commenced) && Boolean(gateway?.gateway?.stamps?.completed)} />
        </Container>
    </Component>
);



const withWrapper = (C) => ({ reorder, hideUp, hideDown, ...props }) => (
    <Container flex alignCenter className={styles.wrapper} >
        <C {...props} />
        <Container>
            <Container className={styles.reorder} col flex center>
                <UpArrow className={hideUp && styles.opaque} onClick={() => reorder(true)} />
                <DownArrow className={hideDown && styles.opaque} onClick={() => reorder(false)} />
            </Container>
        </Container>
    </Container>
)

const C = withRecursiveRender({
    sabbatical: SabbaticalGatewayCard,
    empty: withWrapper(EmptyGatewayCard)
}, withWrapper(Component));

export default strappedConnected(
    C,
    {
        gateway: (state, { orderKey }) => feed.cells.fetchEntity.selectGateway(orderKey)(state)
    },
    {
        reorder: cells.reorderCycleGateway.action,
        refetch: feed.cells.fetchEntity?.action,
        remove: cells.removeGatewayFromActiveCycle.action
    },
    ({ orderKey, gateway, reorder, refetch, boothId, remove }) => ({
        empty: !gateway,
        sabbatical: orderKey === "sabbatical",
        reorder: (moveUp) => reorder({ orderKey, newOrderKey: moveUp ? CYCLE_GATEWAY_KEYS[CYCLE_GATEWAY_KEYS.indexOf(orderKey) - 1] : CYCLE_GATEWAY_KEYS[CYCLE_GATEWAY_KEYS.indexOf(orderKey) + 1] }),
        hideUp: useMemo(() => orderKey === CYCLE_GATEWAY_KEYS[0], [orderKey]),
        hideDown: useMemo(() => orderKey === CYCLE_GATEWAY_KEYS[CYCLE_GATEWAY_KEYS.length - 2], [orderKey]),
        refetch: useCallback(() => refetch({ boothId }), [boothId, refetch]),
        remove: useCallback(() => remove({ orderKey }), [orderKey, remove])

    })
)
