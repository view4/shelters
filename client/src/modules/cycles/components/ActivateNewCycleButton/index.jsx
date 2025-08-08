import withFocusedBoothId from "modules/booths/higher-order-components/withFocusedBoothId";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import feed from "modules/cycles/state/feed";

export default withFocusedBoothId(strappedConnected(
    Button,
    {},
    { create: feed.cells.createEntity.action },
    ({ create, boothId, callback }) => ({
        text: "init iteration",
        onClick: () => create({ input: { boothId, activateCycle: true }, callback })
    })
))