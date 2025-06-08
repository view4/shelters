import FeedModule from "modules/Core/core-modules/FeedModule";
import { FEATURES } from "../consts";
import middleware from "../middleware";

export default new FeedModule({
    name: FEATURES,
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
    }
}); 