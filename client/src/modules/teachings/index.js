import CoreModule from "modules/Core/core-modules/CoreModule";
import feed from "./state/feed";
import { TEACHINGS } from "./consts";
import state from "./state";
import CreateTeachingsBoothScreen from "./components/screens/CreateTeachingsBoothScreen";
import withParams from "modules/Core/higher-order-components/withParams";

export default new CoreModule({
    name: TEACHINGS,
    initialState: {
        ...feed.getInitialFeedState()
    },
    cells: {
        createEntity: feed.cells?.createEntity,
        fetchFeed: feed.cells?.fetchFeed,
        upsertComment: state.upsertComment,
        upsertBooth: state.upsertBooth,
        setFilters: feed.cells?.setFilters,
    },
    routes: {
        "/teachings/create": withParams(CreateTeachingsBoothScreen)
    }
});

