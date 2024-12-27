import FeedModule from "modules/Core/core-modules/FeedModule";
import middleware from "../../middleware";
import { TRACKING } from "../../consts";

const { track} = middleware.ops;

export default new FeedModule({
    name: TRACKING,
    cellOptions: {
        createEntityCell: {
            requestHandler: track
        }
    }
});