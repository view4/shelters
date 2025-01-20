import withFocusedBoothId from "modules/booths/higher-order-components/withFocusedBoothId";
import feed from "modules/booths/state/feed";
import Button from "modules/Core/components/ui-kit/Button";
import { STAMPS } from "modules/Core/consts";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import withShouldRender from "modules/Core/higher-order-components/withShouldRender";
import { onError, onSuccess } from "modules/Core/sub-modules/Dialog/state/cells";

export default withFocusedBoothId(strappedConnected(
    withShouldRender(Button),
    { stamps: (state, { boothId }) => feed.cells.stampEntity.selector(boothId)(state) },
    {
        stamp: (id, callback) => feed.cells.stampEntity.action({ key: STAMPS.COMMENCED, id, callback }),
        refetch: (id) => feed.cells.fetchEntity.action({id}),
        onSuccess: onSuccess,
        onError
    },
    ({ boothId: id, stamp, stamps, refetch, onError, onSuccess }) => ({
        onConfirm: (close) => stamp(id, ({ id }) => {
            if (!Boolean(id)) return onError("Failed to activate this booth")
            onSuccess("Booth activated!")
            refetch(id)
            close()
        }),
        panel: true,
        noChevron: true,
        text: "Activate Booth",
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