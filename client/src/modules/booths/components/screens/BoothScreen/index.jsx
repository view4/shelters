import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import component from "./component";
import withRecursiveRender from "modules/Core/higher-order-components/withRecursiveRender";
import MapalBoothScreen from "modules/mapal/components/screens/MapalBoothScreen";
import feed from "modules/booths/state/feed";
import TeachingsBoothScreen from "modules/teachings/components/screens/TeachingsBoothScreen";

const ComponentTree = withRecursiveRender({
    "mapal": MapalBoothScreen,
    "malchut": TeachingsBoothScreen
}, component)

export default strappedConnected(
    ComponentTree,
    {
         mapal: (state, { focusedBoothId, id }) => feed.cells?.fetchEntity.selectField(id ?? focusedBoothId, "mapal")(state),
         malchut: (state, { focusedBoothId, id }) => feed.cells?.fetchEntity.selectField(id ?? focusedBoothId, "malchut")(state)
    },
    {},
    ({ mapal, malchut, id, focusedBoothId}) => {
        return {}
    }
)