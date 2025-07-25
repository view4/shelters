import React from "react";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import TeachingForm from "../TeachingForm";
import styles from "./styles.module.scss";

const TeachingFormButton = ({ isOpen, onOpen, onClose, initialValues, boothId }) => {
    return (
        <Container className={styles.container} flex row>
            <Button onClick={onOpen}>
                {initialValues ? "Edit" : "Add Teaching"}
            </Button>

            <TeachingForm
                isOpen={isOpen}
                onClose={onClose}
                initialValues={initialValues}
                boothId={boothId}
            />
        </Container>
    );
};

export default TeachingFormButton; 