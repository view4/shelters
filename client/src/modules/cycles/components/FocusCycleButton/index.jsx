import withFocusedBoothId from "modules/booths/higher-order-components/withFocusedBoothId";
import Button from "modules/Core/components/ui-kit/Button";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import cells from "modules/cycles/state/index";
import { useCallback } from "react";

export default withFocusedBoothId(strappedConnected(
    Button,
    {},
    { focus: cells.focusCycle.action },
    ({ focus, cycleId, callback }) => ({
        text: "focus cycle",
        onClick: useCallback(() => focus({ input: { cycleId } }), [focus, cycleId])
    })
))