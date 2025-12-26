import { createSelector } from "@reduxjs/toolkit";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import useOnError from "modules/Core/sub-modules/Dialog/hooks/useOnError";
import useOnSuccess from "modules/Core/sub-modules/Dialog/hooks/useOnSuccess";
import { Button } from "modules/Core/sub-modules/ui-kit/exports";
import cells from "modules/cycles/state/index";
import { useCallback } from "react";
import { useSelector } from "react-redux";

const makeIsReadySelector = createSelector(
    [
        (state) => state?.cycles?.entities,
        (state) => state?.roadmaps?.entities,
        (state, cycleId) => cycleId
    ],
    (cycles, gateways, cycleId) => {
        const cycle = cycles?.[cycleId];
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
        const success = useOnSuccess();
        const error = useOnError();
        const onSuccess = useCallback((res) => {
            if(!res) return error("Failed to complete cycle");
            callback(res)
            success("Cycle Completed!")
        }, [callback, success, error]);

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