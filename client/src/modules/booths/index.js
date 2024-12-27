import CoreModule from "modules/Core/core-modules/CoreModule";
import { BOOTHS } from "./consts";
import CreateBoothScreen from "./components/screens/CreateBoothScreen";
import ActiveBoothScreen from "./components/screens/ActiveBoothScreen";
import feed from "./state/feed";
import BoothsScreen from "./components/screens/BoothsScreen";
import BoothScreen from "./components/screens/BoothScreen";
import withParams from "modules/Core/higher-order-components/withParams";
import cells from "./state/index";

export default new CoreModule({
  name: BOOTHS,
  initialState: {
    ...feed.getInitialFeedState(),
  },
  cells: {
    createEntity: feed.cells?.createEntity,
    fetchFeed: feed.cells?.fetchFeed,
    fetchEntity: feed.cells?.fetchEntity,
    fetchActiveBooth: cells?.fetchActiveBooth,
    stampEntity: feed.cells?.stampEntity,
    setFilters: feed.cells?.setFilters,
  },
  routes: {
    "/create": CreateBoothScreen,
    "/": ActiveBoothScreen,
    "/booths": BoothsScreen,
    "/booths/:id": withParams(BoothScreen),
  },
});