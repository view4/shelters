import withFocusedBoothId from "modules/booths/higher-order-components/withFocusedBoothId";
import feed from "modules/booths/state/feed";
import Button from "modules/Core/components/ui-kit/Button";
import { STAMPS } from "modules/Core/consts";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import withShouldRender from "modules/Core/higher-order-components/withShouldRender";

export default withFocusedBoothId(strappedConnected(
    withShouldRender(Button),
    { stamps: (state, { boothId }) => feed.cells.stampEntity.selector(boothId)(state) },
    { stamp: (id, callback) => feed.cells.stampEntity.action({ key: STAMPS.COMMENCED, id, callback }) },
    ({ boothId: id, stamp, stamps }) => ({
        onConfirm: (close) => stamp(id, ({ id }) => Boolean(id) && close()),
        panel: true,
        text: "Activate Booth?",
        copy: {
            title: "Activate Booth",
            description: "Are you sure you want to activate this booth?"
        },
        modal: true,
        span: true,
        maxWidth: true,
        shouldRender: Boolean(!stamps?.commenced)
    })
))