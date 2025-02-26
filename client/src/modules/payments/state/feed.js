import FeedModule from "modules/Core/core-modules/FeedModule";
import {  PAYMENTS } from "../consts";
import middleware from "../middleware";

export default new FeedModule({
  name: PAYMENTS,
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
