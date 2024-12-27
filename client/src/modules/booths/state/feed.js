import FeedModule from "modules/Core/core-modules/FeedModule";
import { BOOTHS } from "../consts";
import middleware from "../middleware";

export default new FeedModule({
  name: BOOTHS,
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
    stampEntityCell: {
      requestHandler: middleware.ops.stampEntity,
    }
  },
});
