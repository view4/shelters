import CoreModule from "modules/Core/core-modules/CoreModule";
import { CYCLES } from "./consts";
import feed from "./state/feed";
import cells from "./state/index";

export default new CoreModule({
  name: CYCLES,
  initialState: {
    ...feed.getInitialFeedState(),
  },
  cells: {
    createEntity: feed.cells?.createEntity,
    fetchFeed: feed.cells?.fetchFeed,
    fetchEntity: feed.cells?.fetchEntity,
    addGatewayToActiveCycle: cells.addGatewayToActiveCycle,
    reorderCycleGateway: cells.reorderCycleGateway,
    removeGatewayFromActiveCycle: cells.removeGatewayFromActiveCycle,
    setFilters: feed.cells?.setFilters,
  },
  routes: {},
});
