import React from "react";
import Modal from "modules/Core/components/ui-kit/Modal";
import SchemaForm from "modules/Core/components/form/Form/SchemaForm";
import styles from "./styles.module.scss";

const schema = {
    title: "Teachings",
    fields: {
        text: {
            type: "textarea",
            label: "Description",
            required: true
        }
    }
};

const TeachingForm = ({ isOpen, onClose, onSubmit, initialValues }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={initialValues ? "Edit Teaching" : "Create Teaching"}
        >
            <SchemaForm
                schema={schema}
                onSubmit={onSubmit}
                onCancel={onClose}
                initialValues={initialValues}
            />
        </Modal>
    );
};

export default TeachingForm; 