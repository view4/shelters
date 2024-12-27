import CoreModule from "modules/Core/core-modules/CoreModule";
import { TIMETRACKER } from "./consts";
import feed from "./state/feed";
import cells from "./state/cells";

export default new CoreModule({
  name: TIMETRACKER,
  initialState: {
    ...feed?.getInitialFeedState()
  },
  cells: {
    createEntity: feed.cells?.createEntity,
    fetchFeed: feed.cells?.fetchFeed,
    setFilters: feed.cells?.setFilters,
    ...cells
  },
  routes: {
  },
});
