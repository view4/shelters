import { useCallback } from "react";
import feed from "modules/booths/state/feed";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import component from "./component";
import useOnSuccess from "modules/Core/sub-modules/Dialog/hooks/useOnSuccess";
import { useNavigate } from "react-router-dom";

export const BOOTH_SCHEMA = {
    title: "Create Booth",
    fields: {
        name: {
            type: "text",
            label: "Name",
            required: true,
        },
        text: {
            type: "textarea",
            label: "Text Space",
            required: true,
        },
    }
};

export default strappedConnected(
    component,
    {},
    {
        create: feed.cells?.createEntity.action

    },
    ({ create }) => {
        const onSuccess = useOnSuccess();
        const nav = useNavigate();
        const callback = useCallback((res) => {
            if(!res?.id) return null
            onSuccess(`Booth created`)
            nav(`/booths/${res?.id}`)
        }, [nav, onSuccess]);

        return {
            onSubmit: useCallback(({ name, text }) => {
                create({ input: { name, text }, callback })
            }, [callback]),
            schema: BOOTH_SCHEMA
        }
    }
);