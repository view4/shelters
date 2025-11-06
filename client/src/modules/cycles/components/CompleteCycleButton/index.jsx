import { createSelector } from "@reduxjs/toolkit";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import useOnSuccess from "modules/Core/sub-modules/Dialog/hooks/useOnSuccess";
import { Button } from "modules/Core/sub-modules/ui-kit/exports";
import feed from "modules/cycles/state/feed";
import cells from "modules/cycles/state/index";
import { useCallback } from "react";
import { useSelector } from "react-redux";

// I want to have a custom selector here which takes the cycle or cycleId, from cycle gets all the gatewayIds which are there, 
// then it verifies from all the gateways state if it is valid for completing, if not then I think i want to display a modal instead basically... 
const makeIsReadySelector = createSelector(
    [
        (state) => state?.cycles?.entities,
        (state) => state?.roadmaps?.entities,
        (state, cycleId) => cycleId
    ],
    (cycles, gateways, cycleId) => {
        const cycle = cycles?.[cycleId];
        console.log("cycles")
        console.log(cycles)
        console.log(cycle?.a)
        console.log(gateways[cycle?.a])

        console.log("gateways")
        console.log(gateways)

        if (!cycle) return false;

        return [
            gateways[cycle.a?.id],
            gateways[cycle.b?.id],
            gateways[cycle.c?.id],
            gateways[cycle.d?.id],
            gateways[cycle.e?.id],
            gateways[cycle.f?.id],
            gateways[cycle.sabbatical?.gateway?.id]
        ].every(gateway => {
            console.log("gateway")
            console.log(gateway)
            return gateway?.stamps?.completed
        })
    }
)

export default strappedConnected(
    Button,
    {},
    { completeCycle: cells.completeCycle.action },
    ({ cycleId, completeCycle, callback, text = "Complete Cycle" }) => {
        const isReady = useSelector(state => makeIsReadySelector(state, cycleId));
        console.log("isReady")
        console.log(isReady)
        const success = useOnSuccess();
        const onSuccess = useCallback((res) => {
            callback(res)
            success("Cycle Completed!")
        }, [callback, success]);

        const complete = useCallback(() => completeCycle({ id: cycleId, callback: onSuccess }), [cycleId, onSuccess]);
        return {
            text,
            onClick: complete,
            modal: !isReady,
            onConfirm: complete,
            copy: {
                description: "Not all steps have been completed, are you sure you want to complete this cycle?",
                title: "Complete Cycle?",
            }
        }
    }
)