import React from "react";
import cx from "classnames";
import Button from "modules/Core/components/ui-kit/Button";
import Input from "modules/Core/components/ui-kit/Input";
import Container from "modules/Core/components/ui-kit/Container";
import styles from "./styles.module.scss";
import Modal from "modules/Core/components/ui-kit/Modal";
import Title from "modules/Core/components/ui-kit/Title";

const FeatureCommentInput = ({ isOpen, text, onTextChange, className, onSubmit, cancel, open }) => {
    if (!isOpen) {
        return (
            <Button onClick={open}>
                Add Comment
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