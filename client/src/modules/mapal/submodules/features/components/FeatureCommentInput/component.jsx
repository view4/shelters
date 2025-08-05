import React from "react";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import Input from "modules/Core/sub-modules/ui-kit/components/Input";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import styles from "./styles.module.scss";
import Modal from "modules/Core/sub-modules/ui-kit/components/Modal";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";

const FeatureCommentInput = ({ isOpen, text, onTextChange, className, onSubmit, cancel, open, buttonChildren, buttonProps }) => {
    if (!isOpen) {
        return (
            <Button onClick={open} {...buttonProps}>
                {buttonChildren || "Add Comment"}
            </Button>
        );
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={cancel}
            bodyClassName={styles.container}
        >
            <Title>Add Comment</Title>
            <Input
                value={text}
                onChange={onTextChange}
                placeholder="Enter your comment..."
                fullWidth
                autoFocus
            />
            <Container flex flexEnd className={styles.actions}>
                <Button
                    onClick={onSubmit}
                    disabled={!text.trim()}
                >
                    Submit
                </Button>
                <Button onClick={cancel}>
                    Cancel
                </Button>
            </Container>
        </Modal>
    );
};

export default FeatureCommentInput; 