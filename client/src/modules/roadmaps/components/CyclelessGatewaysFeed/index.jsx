import strapped from "modules/Core/higher-order-components/strapped"
import RoadmapsFeed from "../RoadmapsFeed"
import { useMemo } from "react"
import withFocusedBoothId from "modules/booths/higher-order-components/withFocusedBoothId"
import { SelectableGatewayFeedItem } from "../RoadmapFeedItem"

const Component = strapped(
    RoadmapsFeed,
    ({ boothId, isCycleless, onSelect }) => ({
        filters: useMemo(() => ({ boothId, parentId: null, isCycleless: true }), [boothId, isCycleless]),
        ItemComponent: SelectableGatewayFeedItem,
        itemProps: useMemo(() => ({ onSelect }), [onSelect])
    })
)

export default withFocusedBoothId(Component)
