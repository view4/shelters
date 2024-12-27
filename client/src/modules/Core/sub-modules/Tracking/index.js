import CoreModule from "modules/Core/core-modules/CoreModule";
import cells from "./state/cells";
import feed from "./state/feed";
import { TRACKING } from "./consts";


const Tracking = new CoreModule({
    name: TRACKING,
    initialState: {
        ...feed.getInitialFeedState(),  
    },
    cells
});

export default Tracking;