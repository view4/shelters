import Button from "modules/Core/components/ui-kit/Button";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import cells from "modules/cycles/state/index"; 
import { useCallback } from "react";

export default strappedConnected(
    Button,
    {},
    {add: cells.addGatewayToActiveCycle.action},
    ({gatewayId, add}) => ({
        text: "Add to Cycle",
        onClick: useCallback(() => add({gatewayId}), [add, gatewayId])
    })
)