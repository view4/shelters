import FeedModule from "modules/Core/core-modules/FeedModule";
import { MAPAL } from "../consts";
import middleware from "../middleware";

export default new FeedModule({
    name: MAPAL,
    cellOptions: {
        createEntityCell: {
            requestHandler: middleware.ops.create,
        }
    }
}); 