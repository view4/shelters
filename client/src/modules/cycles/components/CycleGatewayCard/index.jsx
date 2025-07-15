import { useCallback, useMemo } from "react"
import cx from "classnames";
import { useDispatch } from "react-redux";
import ExpandableCard from "modules/Core/components/ui-kit/Card/ExpandableCard";
import Container from "modules/Core/components/ui-kit/Container";
import withRecursiveRender from "modules/Core/higher-order-components/withRecursiveRender";
import Card from "modules/Core/components/ui-kit/Card";
import AddGatewayButton from "modules/roadmaps/components/AddGatewayButton";
import Text from "modules/Core/components/ui-kit/Text";
import cells from "modules/cycles/state";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import feed from "modules/cycles/state/feed";
import roadmapsFeedState from "modules/roadmaps/state/feed";
import { DownArrow, UpArrow } from "modules/Core/components/ui-kit/indicators";
import { CYCLE_GATEWAY_KEYS } from "modules/cycles/consts";
import StampGatewayButton from "modules/roadmaps/components/StampGatewayButton";
import { STAMPS } from "modules/Core/consts";
import Stamps from "modules/Core/components/ui-kit/Stamps";
import CompleteSabbaticalButton from "modules/sabbaticals/components/CompleteSabbaticalButton";
import EditGatewayButton from "modules/roadmaps/components/EditGatewayButton";
import ExpandableOptions from "modules/Core/components/ui-kit/ExpandableOptions";
import Stamp from "modules/Core/components/ui-kit/Stamp";
import RoadmapFeedItem, { TitleWithStamps } from "modules/roadmaps/components/RoadmapFeedItem";
import styles from "./styles.module.scss";

const Component = ({ gateway = {}, children, refetch, remove, className, ...props }) => {
    const stamps = useMemo(() => Object.entries(gateway?.stamps ?? {})?.map(([key, value]) => (value && { text: key?.toLowerCase(), timestamp: value })), [gateway?.stamps]);
    return (
        <ExpandableCard
            className={cx(styles.gateway, className)}
            title={<TitleWithStamps title={gateway.name} stamps={gateway.stamps} />}
            size={"lg"} {...props}>
            <ExpandableOptions
                className={styles.options}
                horizontal
                options={[
                    { text: "Remove", onClick: remove },
                    {
                        Component: EditGatewayButton, props: {
                            gatewayId: gateway?.id,
                            onSuccess: refetch,
                            name: gateway?.name,
                            text: gateway?.text,
                            parent: gateway?.parent,
                            parentName: gateway?.parent?.name
                        }
                    },
                    {
                        Component: StampGatewayButton, props: {
                            stampKey: STAMPS.COMMENCED,
                            gatewayId: gateway?.id,
                            shouldRender: !gateway?.stamps?.[STAMPS.COMMENCED],
                            text: "Stamp Commenced",
                            callback: refetch
                        }
                    },
                    {
                        Component: StampGatewayButton, props: {
                            stampKey: STAMPS.COMPLETED,
                            gatewayId: gateway?.id,
                            shouldRender: !gateway?.stamps?.[STAMPS.COMPLETED] && Boolean(gateway?.stamps?.[STAMPS.COMMENCED]),
                            text: "Stamp Completed",
                            callback: refetch
                        }
                    },
                    { Component: AddGatewayButton, props: { parentId: gateway?.id, parentName: gateway?.name, refetchId: gateway?.id } },

                ]}
            />
            <Container relative maxHeight maxWidth>
                <Container mt1>
                    {gateway?.text}
                    {children}
                    {gateway?.childrenIds?.map(id => <CycleChildGatewayCard gatewayId={id} />)}
                    <Container flex flexEnd mt3 >
                        <Container>
                            <Stamps stamps={stamps} />
                        </Container>
                    </Container>
                </Container>
            </Container>
        </ExpandableCard>
    )
};

const EmptyGatewayCard = ({ cycleId, orderKey, onCreateSuccess }) => {
    const dispatch = useDispatch();
    const onSuccess = useCallback((result) => {
        dispatch(cells.addGatewayToCycle.action({ gatewayId: result.id, orderKey, cycleId, callback: () => onCreateSuccess() }))
    }, [cycleId, orderKey, onCreateSuccess]);
    return (
        <Card className={styles.emptyCard}>
            <Container flex spaceBetween alignCenter >
                <Text>Empty</Text>
                <AddGatewayButton
                    cycleId={cycleId}
                    onSuccess={onSuccess}
                    onSelectGateway={onSuccess}
                />
            </Container>
        </Card>
    )
};

export const SabbaticalGatewayCard = ({ gateway = {}, refetch }) => (
    <Component
        className={styles.sabbaticalGateway}
        gateway={gateway.gateway}
        refetch={refetch}
        headerProps={{ appendage: <Stamp nature={"success_street"} stamp="Sabbatical" /> }}
    >
        <Container maxWidth flex alignCenter p1>
            <CompleteSabbaticalButton
                shouldRender={Boolean(gateway?.gateway?.stamps?.commenced) && Boolean(gateway?.gateway?.stamps?.completed)} />
        </Container>
    </Component>
);


const CycleChildGatewayCard = ({ gatewayId }) => strappedConnected(
    ({ gateway }) => (
        <Container>
            <Text>{gateway?.name}</Text>
        </Container>
    ),
    { gateway: roadmapsFeedState.cells.fetchEntity.selector(gatewayId) },
    {},
    ({ gateway }) => ({
        gateway
    })
)


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
    empty: withWrapper(EmptyGatewayCard),
    feedItem: ({ name, id, orderKey, onCreateSuccess, ...props }) => (
        <>
            {
                Boolean(id) ? <RoadmapFeedItem id={id} name={name} {...props} /> : <EmptyGatewayCard onCreateSuccess={onCreateSuccess} cycleId={props.cycleId} orderKey={orderKey} empty />
            }
        </>
    )


}, withWrapper(Component));

export default strappedConnected(
    C,
    {
        gateway: (state, { gatewayId }) => roadmapsFeedState.cells.fetchEntity.selector(gatewayId)(state)
    },
    {
        reorder: cells.reorderCycleGateway.action,
        refetch: feed.cells.fetchEntity?.action,
        remove: cells.removeGatewayFromActiveCycle.action
    },
    ({ orderKey, gateway, reorder, refetch, boothId, remove, feedItem }) => ({
        empty: !feedItem && !gateway,
        sabbatical: orderKey === "sabbatical",
        reorder: (moveUp) => reorder({ orderKey, newOrderKey: moveUp ? CYCLE_GATEWAY_KEYS[CYCLE_GATEWAY_KEYS.indexOf(orderKey) - 1] : CYCLE_GATEWAY_KEYS[CYCLE_GATEWAY_KEYS.indexOf(orderKey) + 1] }),
        hideUp: useMemo(() => orderKey === CYCLE_GATEWAY_KEYS[0], [orderKey]),
        hideDown: useMemo(() => orderKey === CYCLE_GATEWAY_KEYS[CYCLE_GATEWAY_KEYS.length - 2], [orderKey]),
        refetch: useCallback(() => refetch({ boothId }), [boothId, refetch]),
        remove: useCallback(() => remove({ orderKey }), [orderKey, remove])

    })
)
