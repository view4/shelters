import { useState } from "react";
import withFocusedBoothId from "modules/booths/higher-order-components/withFocusedBoothId";
import feed from "modules/booths/state/feed";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import { STAMPS } from "modules/Core/consts";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import withShouldRender from "modules/Core/higher-order-components/withShouldRender";
import { onError, onSuccess } from "modules/Core/sub-modules/Dialog/state/cells";
import styles from "./styles.module.scss";

export default withFocusedBoothId(strappedConnected(
    withShouldRender(Button),
    { stamps: (state, { boothId }) => feed.cells.stampEntity.selector(boothId)(state) },
    {
        stamp: (id, callback) => feed.cells.stampEntity.action({ key: STAMPS.COMPLETED, id, callback }),
        onSuccess,
        onError
    },
    ({ boothId: id, stamp, stamps, onError, onSuccess }) => {
        const [completed, setCompleted] = useState(false);
        return ({
            onConfirm: (close) => stamp(id, ({ id }) => {
                if (!Boolean(id)) return onError("Failed to complete booth")
                close()
                onSuccess("Booth Completed")
                setCompleted(true)
            }),
            text: completed ? "Completed" : "Complete Booth",
            copy: {
                title: "Complete Booth",
                description: "Are you sure you want to mark this booth as completed?"
            },
            modal: true,
            span: true,
            disabled: completed,
            maxWidth: true,
            className: styles.button,
            shouldRender: Boolean(stamps?.commenced && !stamps?.completed)
        })
    }
));