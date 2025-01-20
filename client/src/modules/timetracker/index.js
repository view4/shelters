import CoreModule from "modules/Core/core-modules/CoreModule";
import { TIMETRACKER } from "./consts";
import feed from "./state/feed";
import cells from "./state/cells";
console.log({s: feed.cells?.removeEntity})
export default new CoreModule({
  name: TIMETRACKER,
  initialState: {
    ...feed?.getInitialFeedState()
  },
  cells: {
    createEntity: feed.cells?.createEntity,
    fetchFeed: feed.cells?.fetchFeed,
    setFilters: feed.cells?.setFilters,
    fetchEntity: feed.cells.fetchEntity, 
    removeEntity: feed.cells?.removeEntity,
    ...cells
  },
  routes: {
  },
});
