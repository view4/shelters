import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import component from "./component";
import withRecursiveRender from "modules/Core/higher-order-components/withRecursiveRender";
import MapalBoothScreen from "modules/mapal/components/screens/MapalBoothScreen";
import feed from "modules/booths/state/feed";

const ComponentTree = withRecursiveRender({
    "mapal": MapalBoothScreen
}, component)

export default strappedConnected(
    ComponentTree,
    {
         mapal: (state, { focusedBoothId, id }) => feed.cells?.fetchEntity.selectField(id ?? focusedBoothId, "mapal")(state)
    },
    {
    },
    ({ mapal, id, focusedBoothId}) => {
        return {}
    }
)