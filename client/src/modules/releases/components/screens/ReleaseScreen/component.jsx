import { RELEASE_KEYS } from "modules/releases/consts";
import SukkotReleaseScreen from "../SukkotReleaseScreen";
import FlowingMatterReleaseScreen from "../FlowingMatterReleaseScreen";

export default ({ releaseKey, ...props }) => {
    if (releaseKey === RELEASE_KEYS.sukkot) {
        return <SukkotReleaseScreen {...props} releaseKey={releaseKey} />;
    }
    if (releaseKey === RELEASE_KEYS["2026"]) {
        return <FlowingMatterReleaseScreen {...props} releaseKey={releaseKey} />;
    }
    return <div>Release not found</div>;
}