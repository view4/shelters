import { useCallback } from "react";
import feed from "modules/booths/state/feed";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import component from "./component";

const schema = {
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
        return {
            onSubmit: useCallback(({ name, text }) => {
                create({ input: { name, text } })
            }, []),
            schema
        }
    }
);