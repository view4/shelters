import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import ReleaseScreen from "./component";
import { getReleaseContent } from "modules/releases/utils";
import { useMemo } from "react";

export default strappedConnected(
    ReleaseScreen,
    {},
    {},
    ({ releaseKey }) => {
        const { title, releaseDate, features, links } = useMemo(() => getReleaseContent(releaseKey), [releaseKey]);

        return {
            title,
            releaseDate,
            features,
            links
        }
    }
)