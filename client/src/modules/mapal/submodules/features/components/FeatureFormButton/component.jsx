import React from "react";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import FeatureForm from "../FeatureForm";
import styles from "./styles.module.scss";

const FeatureFormButton = ({ isOpen, onOpen, id, onClose, onSuccess, initialValues, parentId,  boothId }) => {
    return (
        <div className={styles.container}>
            <Button onClick={onOpen}>
                {initialValues ? "Edit" : "Add Feature"}
            </Button>

            <FeatureForm
                isOpen={isOpen}
                initialValues={initialValues}
                parentId={parentId}
                boothId={boothId}
                onSuccess={onSuccess}
                onClose={onClose}
                id={id}
            />
        </div>
    );
};

export default FeatureFormButton; 