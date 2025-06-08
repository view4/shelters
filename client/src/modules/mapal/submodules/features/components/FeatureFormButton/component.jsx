import React from "react";
import Button from "modules/Core/components/ui-kit/Button";
import FeatureForm from "../FeatureForm";
import styles from "./styles.module.scss";

const FeatureFormButton = ({ isOpen, onOpen, onClose, initialValues, boothId }) => {
    return (
        <div className={styles.container}>
            <Button onClick={onOpen}>
                {initialValues ? "Edit" : "Add Feature"}
            </Button>

            <FeatureForm
                isOpen={isOpen}
                onClose={onClose}
                initialValues={initialValues}
                boothId={boothId}
            />
        </div>
    );
};

export default FeatureFormButton; 