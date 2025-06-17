import { useState } from "react";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import { useIsOpen } from "modules/Core/hooks/useIsOpen";
import cells from "../../state";
import feed from "../../state/feed";
import Component from "./component";

export default strappedConnected(
    Component,
    {},
    {
        upsertFeatureComment: cells.upsertFeatureComment.action,
        refetch: feed.cells.fetchEntity.action
    },
    ({ featureId, upsertFeatureComment, refetch }) => {
        const { isOpen, open, close } = useIsOpen();
        const [text, setText] = useState("");

        const handleSubmit = () => {
            if (text.trim()) {
                upsertFeatureComment({
                    input: {
                        featureId,
                        text
                    }
                });
                setText("");
                close();
                refetch({ id: featureId });
            }
        };

        return {
            isOpen,
            text,
            onTextChange: setText,
            onSubmit: handleSubmit,
            cancel: () => {
                setText("");
                close();
            },
            open
        };
    }
); 