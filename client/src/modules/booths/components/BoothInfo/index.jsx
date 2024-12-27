import withFocusedBoothId from "modules/booths/higher-order-components/withFocusedBoothId";
import feed from "modules/booths/state/feed";
import Features from "modules/Core/components/ui-kit/Features";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import { useMemo } from "react";

export default withFocusedBoothId(strappedConnected(
    Features,
    {
        booth: (state, { boothId }) => feed.cells.fetchEntity.selector(boothId)(state)
    },
    {},
    ({ booth, boothId}) => ({
        features: useMemo(() => ([
            {
                name: "Booth Name",
                content: booth?.name
            },
            {
                name: "Booth Description",
                content: booth?.text
            }
        ]), [booth?.id, boothId]),
        card: true

    })
))