import CoreModule from "modules/Core/core-modules/CoreModule";
import { RELEASES } from "./consts";
import feed from "./state/feed";

export default new CoreModule({
  name: RELEASES,
  initialState: {
    ...feed?.getInitialFeedState()
  },
  cells: {
    createEntity: feed.cells?.createEntity,
    fetchFeed: feed.cells?.fetchFeed,
    setFilters: feed.cells?.setFilters,
    fetchEntity: feed.cells.fetchEntity,
    removeEntity: feed.cells?.removeEntity,
  },
  routes: {},
});
