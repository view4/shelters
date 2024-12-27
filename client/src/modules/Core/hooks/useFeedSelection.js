import { useCallback } from "react";
import useSelectedState from "./useSelectedState";

export default (ItemComponent) => {
    const { onSelectFeedItem, selected } = useSelectedState();
    const FeedItemComponent = useCallback((props) => props?.id && (
            <ItemComponent
                {...props}
                selected={Boolean(selected[props?.id])}
                onClick={onSelectFeedItem}
            />
    ), [ItemComponent, onSelectFeedItem, selected]);

    return {
        FeedItemComponent,
        selected
    }
};
