import FeedModule from "modules/Core/core-modules/FeedModule";
import middleware from "../middleware";
import { TIMETRACKER } from "../consts";

export default new FeedModule({
  name: TIMETRACKER,
  cellOptions: {
    createEntityCell: {
      requestHandler: middleware.ops.create,
    },
    fetchFeedCell: {
      requestHandler: middleware.ops.fetchFeed,
    },
  },
});
