import CoreModule from "modules/Core/core-modules/CoreModule";
import { FEATURES } from "./consts";
import feed from "./state/feed";
import cells from "./state";
import FeatureScreen from "./components/screens/FeatureScreen";
import withParams from "modules/Core/higher-order-components/withParams";

export default new CoreModule({
    name: FEATURES,
    initialState: {
        ...feed.getInitialFeedState()
    },
    cells: {
        createEntity: feed.cells?.createEntity,
        fetchFeed: feed.cells?.fetchFeed,
        fetchEntity: feed.cells?.fetchEntity,
        upsertFeatureVote: cells.upsertFeatureVote,
        upsertFeatureComment: cells.upsertFeatureComment,
        stampEntity: feed.cells?.stampEntity,
        setFilters: feed.cells?.setFilters,


    },
    routes: {
        "/feature/:id": withParams(FeatureScreen)
    }
}); 