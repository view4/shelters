import { useCallback } from "react";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import feed from "../../state/feed";
import Component from "./component";
import useOnSuccess from "modules/Core/sub-modules/Dialog/hooks/useOnSuccess";

export default strappedConnected(
    Component,
    {},
    {
        onSubmit: feed.cells.createEntity.action,
        refetchFeed: feed.cells.fetchFeed.action,
    },
    ({ onSubmit, id, boothId, onSuccess: _onSuccess, refetchFeed, parentId, }) => {
        const onSuccess = useOnSuccess();
        const callback = useCallback((res) => {
            if (!res?.upsertFeature?.id) return null;
            onSuccess("Feature created successfully");
            refetchFeed({ renewStream: true });
            _onSuccess?.();
            return res;
        }, [onSuccess, _onSuccess, refetchFeed]);

        return {
            onSubmit: useCallback(({ name, text }) => {
                onSubmit({ input: { name, text, boothId, parentId }, id, callback });
            }, [onSubmit, id, callback, boothId, parentId]),

        };
    }
); 