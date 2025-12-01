import FeedModule from "modules/Core/core-modules/FeedModule";
import {  MEMBERSHIP } from "../consts";

export default new FeedModule({
  name: MEMBERSHIP,
  cellOptions: {
    fetchFeedCell: {
      requestHandler: middleware.ops.fetchFeed,
    },
  },
});
