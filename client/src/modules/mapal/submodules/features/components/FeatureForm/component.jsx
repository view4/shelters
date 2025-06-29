import React from "react";
import Modal from "modules/Core/components/ui-kit/Modal";
import SchemaForm from "modules/Core/components/form/Form/SchemaForm";

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
            <SchemaForm
                schema={schema}
                onSubmit={onSubmit}
                onCancel={onClose}
                initialState={initialValues}
            />
        </Modal>
    );
};

export default FeatureForm; 