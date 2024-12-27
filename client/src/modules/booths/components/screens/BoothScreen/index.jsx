import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import { useOnLoad } from "modules/Core/hooks/useOnLoad";
import feed from "modules/booths/state/feed";
import component from "./component";

export default strappedConnected(
    component, 
    {},
    {fetch: (id) =>  feed.cells?.fetchEntity.action({id})},
    ({id, fetch}) => {
        useOnLoad(
            () => fetch(id),
            Boolean(id)
            [id]
        )
        return {}
    }
)