import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import component from "../BoothScreen/component";
import cells from "modules/booths/state/index";
import { useOnLoad } from "modules/Core/hooks/useOnLoad";

export default strappedConnected(
    component,
    {activeBoothId: cells.fetchActiveBooth.selectors.id},
    {fetch: cells.fetchActiveBooth.action}, 
    ({fetch, activeBoothId}) => {
        useOnLoad(
            () => fetch(),
            !activeBoothId,
            []
        )

    }
);