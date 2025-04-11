import FeedModule from "modules/Core/core-modules/FeedModule";
import middleware from "../middleware";
import { TIMEMAPPER } from "../consts";

export default new FeedModule({
  name: TIMEMAPPER,
  cellOptions: {
    createEntityCell: {
      requestHandler: middleware.ops.create,
    },
    fetchFeedCell: {
      requestHandler: middleware.ops.fetchFeed,
    },
    removeEntityCell: {
      requestHandler: middleware.ops.removeEntity,
    },
  },
});
