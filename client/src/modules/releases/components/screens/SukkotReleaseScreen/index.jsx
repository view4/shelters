import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import SukkotReleaseScreen from "./component";
import { getReleaseContent } from "modules/releases/utils";
import { useMemo } from "react";

export default strappedConnected(
    SukkotReleaseScreen,
    {},
    {},
    ({ releaseKey }) => {
    }
)