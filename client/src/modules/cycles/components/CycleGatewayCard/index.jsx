import { useCallback, useMemo } from "react"
import withRecursiveRender from "modules/Core/higher-order-components/withRecursiveRender";
import cells from "modules/cycles/state";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import state from "modules/cycles/state";
import roadmapsFeedState from "modules/roadmaps/state/feed";
import { CYCLE_GATEWAY_KEYS } from "modules/cycles/consts";
import SabbaticalGateway from "./SabbaticalGatewayCard/component"
import RoadmapFeedItem from "modules/roadmaps/components/RoadmapFeedItem";
import withGatewayCardWrapper from "./withGatewayCardWrapper";
import component, { EmptyGatewayCard } from "./component";

const C = withRecursiveRender({
    sabbatical: SabbaticalGateway,
    empty: withGatewayCardWrapper(EmptyGatewayCard),
    feedItem: ({ name, id, orderKey, onCreateSuccess, ...props }) => (
        <>
            {
                Boolean(id) ? <RoadmapFeedItem id={id} name={name} {...props} /> : <EmptyGatewayCard onCreateSuccess={onCreateSuccess} cycleId={props.cycleId} orderKey={orderKey} empty />
            }
        </>
    )
}, withGatewayCardWrapper(component));

export default strappedConnected(
    C,
    {
        gateway: (state, { gatewayId }) => roadmapsFeedState.cells.fetchEntity.selector(gatewayId)(state)
    },
    {
        reorder: cells.reorderCycleGateway.action,
        refetch: state.fetchCycle.action,
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
