import React from "react";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import cells from "../../state";
import Component from "./component";

export default strappedConnected(
    Component,
    {},
    {
        upsertFeatureVote: cells.upsertFeatureVote.action
    },
    ({ featureId, upsertFeatureVote, isOpen, onClose }) => {
        const handleSubmit = (data) => {
            upsertFeatureVote({
                input: {
                    featureId,
                    ...data
                }
            });
            onClose();
        };

        return {
            isOpen,
            onClose,
            onSubmit: handleSubmit
        };
    }
); 