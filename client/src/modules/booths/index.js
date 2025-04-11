import CoreModule from "modules/Core/core-modules/CoreModule";
import { BOOTHS } from "./consts";
import CreateBoothScreen from "./components/screens/CreateBoothScreen";
import ActiveBoothScreen from "./components/screens/ActiveBoothScreen";
import feed from "./state/feed";
import BoothsScreen from "./components/screens/BoothsScreen";
import BoothScreen from "./components/screens/BoothScreen";
import withParams from "modules/Core/higher-order-components/withParams";
import cells from "./state/index";
import withSecureRoute from "modules/auth/hoc/withSecureRoute";
import withFocusedBoothId from "./higher-order-components/withFocusedBoothId";
import {
  BoothCyclesScreen,
  BoothDedicatedTimeScreen,
  BoothEntriesScreen,
  BoothInfoScreen,
  BoothRoadmapsScreen,
} from "./components/screens";

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
    "/create": withSecureRoute(CreateBoothScreen),
    "/": withSecureRoute(ActiveBoothScreen),
    "/booths": withSecureRoute(BoothsScreen),
    "/booths/:id": withParams(BoothScreen),
    "/roadmaps": withFocusedBoothId(BoothRoadmapsScreen),
    "/cycles": withFocusedBoothId(BoothCyclesScreen),
    "/entries": withFocusedBoothId(BoothEntriesScreen),
    "/time-mapping": withFocusedBoothId(BoothDedicatedTimeScreen),
    "/info": withFocusedBoothId(BoothInfoScreen),
    "booths/:boothId/roadmaps": withParams(BoothRoadmapsScreen),
    "booths/:boothId/cycles": withParams(BoothCyclesScreen),
    "booths/:boothId/entries": withParams(BoothEntriesScreen),
    "booths/:boothId/time-mapping": withParams(BoothDedicatedTimeScreen),
    "booths/:boothId/info": withParams(BoothInfoScreen),
  },
});
