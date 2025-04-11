import { useCallback } from "react";
import Button from "modules/Core/components/ui-kit/Button";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import cells from "modules/cycles/state/index";

export default strappedConnected(
    Button,
    {},
    { focus: cells.focusCycle.action },
    ({ focus, cycleId, callback }) => ({
        text: "focus cycle",
        onClick: useCallback(() => focus({ id: cycleId, callback }), [focus, cycleId, callback])
    })
)