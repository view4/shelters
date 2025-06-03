import CoreModule from "modules/Core/core-modules/CoreModule";
import { FEATURES } from "./consts";
import feed from "./state/feed";
import cells from "./state";

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
        upsertFeatureComment: cells.upsertFeatureComment
    },
    routes: {}
}); 