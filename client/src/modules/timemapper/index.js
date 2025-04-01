import CoreModule from "modules/Core/core-modules/CoreModule";
import { TIMEMAPPER } from "./consts";
import feed from "./state/feed";

export default new CoreModule({
  name: TIMEMAPPER,
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
