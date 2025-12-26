import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import ReleaseScreen from "./component";
import { getReleaseContent } from "modules/releases/utils";
import { useMemo } from "react";
// TODO: maybe to rename this accordingly. 
export default strappedConnected(
    ReleaseScreen,
    {},
    {},
    ({ releaseKey }) => {

    }
)