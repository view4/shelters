import CoreModule from "modules/Core/core-modules/CoreModule";
import { CYCLES } from "./consts";
import feed from "./state/feed";
import cells from "./state/index";
import ViewCycle from "./components/screens/ViewCycle";
import withParams from "modules/Core/higher-order-components/withParams";

export default new CoreModule({
  name: CYCLES,
  initialState: {
    ...feed.getInitialFeedState(),
  },
  cells: {
    createEntity: feed.cells?.createEntity,
    fetchFeed: feed.cells?.fetchFeed,
    addGatewayToActiveCycle: cells.addGatewayToActiveCycle,
    reorderCycleGateway: cells.reorderCycleGateway,
    removeGatewayFromActiveCycle: cells.removeGatewayFromActiveCycle,
    setFilters: feed.cells?.setFilters,
    addGatewayToCycle: cells.addGatewayToCycle,
    focusCycle: cells.focusCycle,
    fetchCurrentCycle: cells.fetchCurrentCycle,
    fetchEntity: feed.cells?.fetchEntity,
  },
  routes: {
    "/cycles/:id": withParams(ViewCycle)
  },
});
