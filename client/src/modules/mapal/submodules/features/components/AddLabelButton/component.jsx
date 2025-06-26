import React from "react";
import { useCallback } from "react";
import Modal from "modules/Core/components/ui-kit/Modal";
import SchemaForm from "modules/Core/components/form/Form/SchemaForm";
import Button from "modules/Core/components/ui-kit/Button";
import state from "modules/mapal/submodules/features/state";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import withFocusedBoothId from "modules/booths/higher-order-components/withFocusedBoothId";
import LabelSelectField from "../LabelSelectField";

const schema = {
    header: "Add Label",
    fields: {
        label: {
            label: "Label",
            Component: withFocusedBoothId(LabelSelectField),
            required: true
        }
    }
};

const AddLabelForm = strappedConnected(
    SchemaForm,
    {},
    {
        addFeatureLabel: state.addFeatureLabel?.action
    },
    ({ featureId, addFeatureLabel, onClose }) => {
        const handleSubmit = useCallback((data) => {
            const input = {
                featureId,
                ...(data.label?.isNew 
                    ? { name: data.label.name }  // New label - pass name
                    : { labelId: data.label.id } // Existing label - pass labelId
                )
            };
            
            addFeatureLabel({
                input,
                callback: onClose
            });
        }, [featureId, addFeatureLabel, onClose]);

        return {
            schema,
            onSubmit: handleSubmit,
            onCancel: onClose
        };
    }
);

const AddLabelButton = ({ isOpen, onOpen, onClose, featureId }) => {
    return (
        <>
            <Button onClick={onOpen} text="+" />
            <Modal isOpen={isOpen} onClose={onClose} title="Add Label">
                <AddLabelForm featureId={featureId} onClose={onClose} />
            </Modal>
        </>
    );
};

export default AddLabelButton; 