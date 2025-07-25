import FeedModule from "modules/Core/core-modules/FeedModule";
import { TEACHINGS } from "../consts";
import middleware from "../middleware";

export default new FeedModule({
    name: TEACHINGS,
    cellOptions: {
        createEntityCell: {
            requestHandler: middleware.ops.create,
        },
        fetchFeedCell: {
            requestHandler: middleware.ops.fetchFeed,
        },
        upsertCommentCell: {
            requestHandler: middleware.ops.upsertComment,
        }
    }
}); 