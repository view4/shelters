import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import withFocusedBoothId from "modules/booths/higher-order-components/withFocusedBoothId";
import { useOnLoad } from "modules/Core/hooks/useOnLoad";
import withRecursiveRender from "modules/Core/higher-order-components/withRecursiveRender";
import state from "modules/cycles/state";
import feed from "modules/cycles/state/feed";
import component, { Placeholder } from "./component";
import { Fragment } from "react";

export default withFocusedBoothId(strappedConnected(
    withRecursiveRender({ ['cycle']: component, ['placeholder']: Placeholder }, Fragment),
    {
        currentCycle: state.fetchCurrentCycle.selectors.activeCycle,
        cycle: (state, { id }) => feed.cells.fetchEntity.selector(id)(state),
        isLoading: state.fetchCurrentCycle.selectors.isLoading
    },
    { 
        fetchCurrentCycle: state.fetchCurrentCycle.action,
        fetchEntity: feed.cells.fetchEntity.action
    },
    ({ boothId, fetchCurrentCycle, currentCycle, cycle, id, fetchEntity, isLoading }) => {
        console.log("BOOTH ID", boothId)
        console.log("ID", id)
        console.log("CURRENT CYCLE", currentCycle)
        console.log("CYCLE", cycle)
        useOnLoad(
            () => fetchCurrentCycle({ boothId }),
            Boolean(boothId &&  !id),
            [boothId]
        )

        useOnLoad(
            () => fetchEntity({ id }),
            Boolean(id),
            [id]
        )


        return {
            cycle: currentCycle || cycle,
            isLoading,
            placeholder: !id && !currentCycle && !cycle
        }
    }
));