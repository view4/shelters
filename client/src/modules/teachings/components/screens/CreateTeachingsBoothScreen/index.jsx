import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import Component from "./component";
import useOnSuccess from "modules/Core/sub-modules/Dialog/hooks/useOnSuccess";
import state from 'modules/teachings/state'

export default strappedConnected(
    Component,
    {},
    {
        createEntity: state.upsertBooth.action
    },
    ({ createEntity }) => {
        const navigate = useNavigate();
        const onSuccess = useOnSuccess();

        const callback = useCallback((res) => {
            if (!res?.id) return null;
            onSuccess("Booth created successfully");
            navigate(`/booths/${res.id}`);
        }, [navigate, onSuccess]);

        return {
            onSubmit: useCallback(({ name, text }) => {
                createEntity({ input: { name, text }, callback });
            }, [createEntity, callback])
        };
    }
); 