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
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default new CoreModule({
  name: BOOTHS,
  initialState: {
    ...feed.getInitialFeedState(),
  },
  cells: {
    createEntity: feed.cells?.createEntity,
    fetchFeed: feed.cells?.fetchFeed,
    fetchEntity: feed.cells?.fetchEntity,
    fetchFocusedBooth: cells?.fetchFocusedBooth,
    stampEntity: feed.cells?.stampEntity,
    setFilters: feed.cells?.setFilters,
    fetchActiveBooths: cells?.fetchActiveBooths,
  },
  routes: {
    "/create": withSecureRoute(() => {
      const navigate = useNavigate();
      useEffect(() => {
          navigate("/booths/create");
      }, [ navigate]);
      return null;
    }),
    "/booths/create": withSecureRoute(CreateBoothScreen),
    "/": withSecureRoute(ActiveBoothScreen, {redirectUrl: "/homepage"}),
    "/booths": withSecureRoute(BoothsScreen),
    "/booths/:boothId": withParams(BoothScreen),
    "/roadmaps": withFocusedBoothId(BoothRoadmapsScreen),
    "/cycles": withFocusedBoothId(BoothCyclesScreen),
    "/entries": withFocusedBoothId(BoothEntriesScreen),
    "/time-mapping": withFocusedBoothId(BoothDedicatedTimeScreen),
    "/info": withFocusedBoothId(BoothInfoScreen),
    "booths/:boothId/roadmaps": withFocusedBoothId(BoothRoadmapsScreen),
    "booths/:boothId/cycles": withFocusedBoothId(BoothCyclesScreen),
    "booths/:boothId/entries": withFocusedBoothId(BoothEntriesScreen),
    "booths/:boothId/time-mapping": withFocusedBoothId(BoothDedicatedTimeScreen),
    "booths/:boothId/info": withFocusedBoothId(BoothInfoScreen),
  },
});
