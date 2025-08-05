import React from "react";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import TeachingForm from "../TeachingForm";
import styles from "./styles.module.scss";

const TeachingFormButton = ({ isOpen, onOpen, id, parentId, onClose, initialValues, boothId, text="Add Teaching" }) => {
    return (
        <Container className={styles.container} flex row>
            <Button onClick={onOpen}>
                {text}
            </Button>

            <TeachingForm
                isOpen={isOpen}
                onClose={onClose}
                initialValues={initialValues}
                boothId={boothId}
                id={id}
                parentId={parentId}
            />
        </Container>
    );
};

export default TeachingFormButton; 