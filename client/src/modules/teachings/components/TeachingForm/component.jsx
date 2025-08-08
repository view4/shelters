import React from "react";
import Modal from "modules/Core/sub-modules/ui-kit/components/Modal";
import SchemaForm from "modules/Core/components/form/Form/SchemaForm";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import feed from "modules/teachings/state/feed";
import { Container, Title } from "modules/Core/sub-modules/ui-kit/exports";
import { InputLabel } from "modules/Core/sub-modules/ui-kit/components/Input";
import styles from "./styles.module.scss";

const ParentTeachingFieldComponent = ({ parent, value }) => {
    if (parent) {
        return (
            <Container>
                <InputLabel label="Parent Teaching" />
                <Title>{parent.name}</Title>
            </Container>
        )
    }
    return null;
}

export const ParentTeachingField = strappedConnected(
    ParentTeachingFieldComponent,
    {
        parent: (state, { value }) => feed.cells.fetchEntity.selector(value)(state)
    },
    {}
)

export const schema = {
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

const TeachingForm = ({ isOpen, onClose, initialValues, onSubmit, schema: _schema }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={initialValues ? "Edit Teaching" : "Create Teaching"}
        >
            <SchemaForm
                schema={_schema || schema}
                initialState={initialValues}
                onSubmit={onSubmit}
            />
        </Modal>
    );
};

export default TeachingForm; 