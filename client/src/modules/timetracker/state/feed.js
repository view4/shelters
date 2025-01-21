import FeedModule from "modules/Core/core-modules/FeedModule";
import middleware from "../middleware";
import { TIMETRACKER } from "../consts";

export default new FeedModule({
  name: TIMETRACKER,
  cellOptions: {
    createEntityCell: {
      requestHandler: middleware.ops.create,
    },
    fetchEntityCell: {
      requestHandler: middleware.ops.fetchEntity,
    },
    fetchFeedCell: {
      requestHandler: middleware.ops.fetchFeed,
    },
  },
});
