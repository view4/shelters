import FeedModule from "modules/Core/core-modules/FeedModule";
import middleware from "../middleware";
import { AUTH } from "../consts";

export default new FeedModule({
  name: AUTH,
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
