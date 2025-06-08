import CoreModule from "modules/Core/core-modules/CoreModule";
import { MAPAL } from "./consts";
import feed from "./state/feed";
import CreateMapalBoothScreen from "./components/screens/CreateMapalBoothScreen";

export default new CoreModule({
    name: MAPAL,
    initialState: {
        ...feed.getInitialFeedState()
    },
    cells: {
        createEntity: feed.cells?.createEntity
    },
    routes: {
        "/mapal/create": CreateMapalBoothScreen
    }
});

