import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import ReleaseScreen from "./component";
import { getReleaseContent } from "modules/releases/utils";
import { useMemo } from "react";

export default strappedConnected(
    ReleaseScreen,
    {},
    {},
    ({ releaseKey }) => {
        const { title, releaseDate, features, narrative, links } = useMemo(() => getReleaseContent(releaseKey) ?? {}, [releaseKey]);

        return {
            hasError: !title?.length,
            title,
            releaseDate,
            features,
            narrative,
            links
        }
    }
)