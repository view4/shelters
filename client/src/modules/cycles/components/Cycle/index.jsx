import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import withFocusedBoothId from "modules/booths/higher-order-components/withFocusedBoothId";
import { useOnLoad } from "modules/Core/hooks/useOnLoad";
import withRecursiveRender from "modules/Core/higher-order-components/withRecursiveRender";
import state from "modules/cycles/state";
import component, { Placeholder } from "./component";

export default withFocusedBoothId(strappedConnected(
    withRecursiveRender({ ['cycle']: component, ['placeholder']: Placeholder }),
    {
        cycle: state.fetchCycle.selectors.activeCycle,
        isLoading: state.fetchCycle.selectors.isLoading
    },
    { fetch: state.fetchCycle.action },
    ({ boothId, fetch, cycle, isLoading }) => {
        useOnLoad(
            () => fetch({ boothId }),
            Boolean(boothId),
            [boothId]
        )
        return {
            cycle,
            isLoading,
            placeholder: !cycle
        }
    }
));