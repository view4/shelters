import React from "react";
import Modal from "modules/Core/components/ui-kit/Modal";
import styles from "./styles.module.scss";
import SchemaForm from "modules/Core/components/form/Form/SchemaForm";
import VoteButtons from "../VoteButtons";
import Title from "modules/Core/components/ui-kit/Title";

const schema = {
    header: "Feature Form",
    fields: {
        name: {
            type: "text",
            label: "Name",
            required: true
        },
        text: {
            type: "textarea",
            label: "Description",
            required: true
        }
    }
};

const FeatureForm = ({ isOpen, onClose, onSubmit, initialValues }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={initialValues ? "Edit Feature" : "Create Feature"}
        >
            {/* <Title ml3>Feature Form:</Title> */}
            <SchemaForm
                schema={schema}
                onSubmit={onSubmit}
                onCancel={onClose}
                initialValues={initialValues}
            />
        </Modal>
    );
};

export default FeatureForm; 