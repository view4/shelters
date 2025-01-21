import FeedModule from "modules/Core/core-modules/FeedModule";
import middleware from "../middleware";
import { TRACKED_TIME } from "../consts";

export default new FeedModule({
  name: TRACKED_TIME,
  cellOptions: {
    createEntityCell: {
      requestHandler: middleware.ops.create,
    },
    fetchFeedCell: {
      requestHandler: middleware.ops.fetchFeed,
    },
    removeEntityCell: { 
      requestHandler: middleware.ops.remove
     },
  },
});
