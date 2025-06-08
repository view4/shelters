import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import feed from "modules/mapal/state/feed";
import Component from "./component";
import useOnSuccess from "modules/Core/sub-modules/Dialog/hooks/useOnSuccess";
// import { showSuccess } from "modules/Core/state/notifications";


export default strappedConnected(
    Component,
    {},
    {
        createEntity: feed.cells.createEntity.action
    },
    ({ createEntity }) => {
        const navigate = useNavigate();
        const onSuccess = useOnSuccess();

        const callback = useCallback((res) => {
            if (!res?.id) return null;
            onSuccess("Booth created successfully");
            navigate(`/feature/${res.id}`);
        }, [navigate]);

        return {
            onSubmit: useCallback(({ name, text }) => {
                createEntity({ input: { name, text }, callback });
            }, [createEntity, callback])
        };
    }
); 