import withFocusedBoothId from "modules/booths/higher-order-components/withFocusedBoothId";
import feed from "modules/booths/state/feed";
import Button from "modules/Core/components/ui-kit/Button";
import { STAMPS } from "modules/Core/consts";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import withShouldRender from "modules/Core/higher-order-components/withShouldRender";
import { onError, onSuccess } from "modules/Core/sub-modules/Dialog/state/cells";
import styles from "./styles.module.scss";

export default withFocusedBoothId(strappedConnected(
    withShouldRender(Button),
    {
        stamps: (state, { boothId }) => feed.cells.stampEntity.selector(boothId)(state),
        isFocused: (state, { boothId }) => feed.cells.fetchEntity.selectField(boothId, 'isFocused')(state)
    },
    {
        stamp: (id, callback) => feed.cells.stampEntity.action({ key: STAMPS.FOCUSED, id, callback }),
        refetch: (id) => feed.cells.fetchEntity.action({ id }),
        onSuccess: onSuccess,
        onError
    },
    ({ boothId: id, stamp, stamps, refetch, onError, onSuccess, isFocused }) => ({
        onClick: (close) => stamp(id, ({ id }) => {
            if (!Boolean(id)) return onError("Failed to focus this booth")
            onSuccess("Booth focused!")
            refetch(id)
            close()
        }),
        panel: true,
        noChevron: true,
        text: "Focus Booth",
        span: true,
        maxWidth: true,
        flex: true,
        alignCenter: true,
        className: styles.button,
        center: true,
        shouldRender: Boolean(stamps?.commenced && !isFocused)
    })
)) 