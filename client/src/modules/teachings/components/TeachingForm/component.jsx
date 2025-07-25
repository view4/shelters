import React from "react";
import Modal from "modules/Core/sub-modules/ui-kit/components/Modal";
import SchemaForm from "modules/Core/components/form/Form/SchemaForm";
import styles from "./styles.module.scss";

const schema = {
    title: "Teachings",
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

const TeachingForm = ({ isOpen, onClose, initialValues, onSubmit }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={initialValues ? "Edit Teaching" : "Create Teaching"}
        >
            <SchemaForm
                schema={schema}
                initialValues={initialValues}
                onSubmit={onSubmit}
            />
        </Modal>
    );
};

export default TeachingForm; 