import CoreModule from "modules/Core/core-modules/CoreModule";
import feed from "./state/feed";
import { PAYMENTS } from "./consts";

export default new CoreModule({
  name: PAYMENTS,
  initialState: {
    ...feed.getInitialFeedState(),
  },
  cells: {
    createEntity: feed.cells?.createEntity,
    fetchFeed: feed.cells?.fetchFeed,
    setFilters: feed.cells?.setFilters,
    fetchEntity: feed.cells?.fetchEntity,
  },
  routes: {},
});
