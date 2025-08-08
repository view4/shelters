import React from "react";
import Modal from "modules/Core/sub-modules/ui-kit/components/Modal";
import SchemaForm from "modules/Core/components/form/Form/SchemaForm";
import styles from "./styles.module.scss";
import VoteButtons from "../VoteButtons";

const schema = {
    type: "object",
    fields: {
        score: {
            Component: VoteButtons,
            label: "Vote",
            className: styles.voteButtons,
        },
        text: {
            type: "string",
            label: "Text"
        },

    },
    required: ["text", "score"]
};

const FeatureVoteForm = ({ isOpen, onClose, onSubmit }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Add Vote"
        >
            <SchemaForm
                schema={schema}
                onSubmit={onSubmit}
                onCancel={onClose}
            />
        </Modal>
    );
};

export default FeatureVoteForm; 