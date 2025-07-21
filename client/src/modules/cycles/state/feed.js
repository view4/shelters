import { compact } from 'lodash'
import FeedModule from "modules/Core/core-modules/FeedModule";
import { CYCLES } from "../consts";
import middleware from "../middleware";

export const extractGateways = cycle => {
  // TODO: extract children here...
  return compact([
    cycle?.a,
    cycle?.b,
    cycle?.c,
    cycle?.d,
    cycle?.e,
    cycle?.f,
    cycle?.sabbatical?.gateway,
  ])
}


export default new FeedModule({
  name: CYCLES,
  cellOptions: {
    createEntityCell: {
      requestHandler: middleware.ops.create,
    },
    fetchFeedCell: {
      requestHandler: middleware.ops.fetchFeed,
    },
  },
});
