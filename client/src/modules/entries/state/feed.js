import FeedModule from "modules/Core/core-modules/FeedModule";
import { ENTRIES } from "../consts";
import middleware from "../middleware";

export default new FeedModule({
  name: ENTRIES,
  cellOptions: {
    createEntityCell: {
      requestHandler: middleware.ops.create,
    },
    fetchFeedCell: {
      requestHandler: middleware.ops.fetchFeed,
    },
    fetchEntityCell: {
      requestHandler: middleware.ops.fetchEntity,
    },
  },
});
