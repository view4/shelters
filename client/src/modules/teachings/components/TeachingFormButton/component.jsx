import React from "react";
import Button from "modules/Core/components/ui-kit/Button";
import TeachingForm from "../TeachingForm";
import styles from "./styles.module.scss";

const TeachingFormButton = ({ isOpen, onOpen, onClose, initialValues, boothId }) => {
    return (
        <div className={styles.container}>
            <Button onClick={onOpen}>
                {initialValues ? "Edit" : "Add Teaching"}
            </Button>

            <TeachingForm
                isOpen={isOpen}
                onClose={onClose}
                initialValues={initialValues}
                boothId={boothId}
            />
        </div>
    );
};

export default TeachingFormButton; 