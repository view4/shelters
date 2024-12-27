import FeedModule from "modules/Core/core-modules/FeedModule";
import { ROADMAPS } from "../consts";
import middleware from "../middleware";

export default new FeedModule({
  name: ROADMAPS,
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
