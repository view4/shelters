import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import feed from "modules/cycles/state/feed";
import component from "./component";
import { useOnLoad } from "modules/Core/hooks/useOnLoad";

export default strappedConnected(
    component,
    {
        // cycle: (state, { id }) => feed.cells.fetchEntity.selectField(id, "cycle")(state)
    },
    {
        // fetchEntity: feed.cells.fetchEntity.action
    },
    ({ cycle, id, fetchEntity }) => {
        console.log("BEING CALLED HERE...")

        // useOnLoad(() => {
        //     fetchEntity({ id });
        // }, id, [id]);
        
        return {
            cycle,
            id,
            // fetchEntity
        }
    }
)