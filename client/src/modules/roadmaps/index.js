import CoreModule from "modules/Core/core-modules/CoreModule";
import { ROADMAPS } from "./consts";
import feed from "./state/feed";
import cells from "./state";
import ViewRoadmap from "./components/screens/ViewRoadmap";
import withParams from "modules/Core/higher-order-components/withParams";

export default new CoreModule({
  name: ROADMAPS,
  initialState: {
    ...feed.getInitialFeedState(),
  },
  cells: {
    createEntity: feed.cells?.createEntity,
    fetchFeed: feed.cells?.fetchFeed,
    setFilters: feed.cells?.setFilters,
    fetchEntity: feed.cells?.fetchEntity,
    ...cells
  },
  routes: {
    "/view-roadmap/:id": withParams(ViewRoadmap)
  },
});
