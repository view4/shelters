import CoreModule from "modules/Core/core-modules/CoreModule";
import { MAPAL } from "./consts";
import feed from "./state/feed";
import features from "./submodules/features";

export default new CoreModule({
    name: MAPAL,
    initialState: {
        ...feed.getInitialFeedState()
    },
    cells: {
        createEntity: feed.cells?.createEntity
    },
    routes: {},
});

