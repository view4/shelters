import CoreModule from "modules/Core/core-modules/CoreModule";
import { TRACKED_TIME } from "./consts";
import feed from "./state/feed";
import cells from "./state/cells";
import withParams from "modules/Core/higher-order-components/withParams";
import TrackedTimeScreen from "./components/screens/TrackedTimeScreen";

export default new CoreModule({
  name: TRACKED_TIME,
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
    "/tracked-times/:dedicatedTimeId": withParams(TrackedTimeScreen)
  },
});
