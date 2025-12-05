import FeedModule from "modules/Core/core-modules/FeedModule";
import { ADMIN } from "../consts";
import middleware from "../middleware";

export default new FeedModule({
    name: ADMIN,
    cellOptions: {
        fetchFeedCell: {
            requestHandler: middleware.ops.fetchUsers,
        },
    },
});

