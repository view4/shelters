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
        refetch: feed.cells.fetchFeed.action
    },
    ({ onSubmit,  id, onClose, refetch, boothId, parentId, initialValues }) => {
        const onSuccess = useOnSuccess();
        
        const callback = useCallback((res) => {
            if (!res?.id) return null;
            onSuccess("Teaching created successfully");
            onClose();
            refetch({renewStream: true });
            return res;
        }, [onSuccess, onClose, refetch]);

        const initialValues = useMemo(() => ({
            name: initialValues?.name,
            text: initialValues?.text,
            parentId,
        }), [initialValues, parentId]);

        return {
            onSubmit: useCallback(({ name, text, parentId }) => {
                onSubmit({ input: { name, text, boothId, parentId }, id, callback });
            }, [onSubmit, id, callback, boothId, parentId]),
            initialValues,
        };
    }
); 