import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import component from "./component";
import withRecursiveRender from "modules/Core/higher-order-components/withRecursiveRender";
import MapalBoothScreen from "modules/mapal/components/screens/MapalBoothScreen";
import feed from "modules/booths/state/feed";
import TeachingsBoothScreen from "modules/teachings/components/screens/TeachingsBoothScreen";
import AdminHomeScreen from "modules/admin/components/screens/AdminHomeScreen";

const ComponentTree = withRecursiveRender({
    "mapal": MapalBoothScreen,
    "malchut": TeachingsBoothScreen,
    "admin": AdminHomeScreen
}, component)

export default strappedConnected(
    ComponentTree,
    {
         mapal: (state, { focusedBoothId, boothId }) => feed.cells?.fetchEntity.selectField(boothId ?? focusedBoothId, "mapal")(state),
         malchut: (state, { focusedBoothId, boothId }) => feed.cells?.fetchEntity.selectField(boothId ?? focusedBoothId, "malchut")(state),
         admin: (state, { focusedBoothId, boothId }) => feed.cells?.fetchEntity.selectField(boothId ?? focusedBoothId, "admin")(state)
    },
    {},
    ({ mapal, malchut, admin, id, focusedBoothId}) => {
        return {}
    }
)