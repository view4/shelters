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
    },
    ({ onSubmit, initialValues, id, boothId,  }) => {
        const onSuccess = useOnSuccess();
        
        const callback = useCallback((res) => {
            if (!res?.id) return null;
            onSuccess("Teaching created successfully");
            return res;
        }, [onSuccess]);

        return {
            onSubmit: useCallback(({ name, text }) => {
                onSubmit({ input: { name, text, boothId }, id, callback });
            }, [onSubmit, id, callback, boothId]),
            
        };
    }
); 