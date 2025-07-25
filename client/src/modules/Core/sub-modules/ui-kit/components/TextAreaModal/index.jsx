import cx from "classnames";
import { useState } from "react";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Input from "modules/Core/sub-modules/ui-kit/components/Input";
import Modal from "modules/Core/sub-modules/ui-kit/components/Modal";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import styles from "./styles.module.scss";

const TextAreaModal = ({ isOpen, close, className, title, onSubmit, textFieldProps }) => {
    const [text, setText] = useState("");
    return (
        <Modal isOpen={isOpen} onClose={close} >
            <Container className={cx(styles.container, className)}>
                <Title text={title} Element='h3' />
                <Input
                    value={text}
                    onChange={setText}
                    className={styles.textarea}
                    rows={12}
                    textarea
                    {...textFieldProps}
                />
                <Container flex flexEnd>
                    <Button onClick={close} text="Cancel" />
                    <Button onClick={() => onSubmit(text)} text="Submit" />
                </Container>
            </Container>
        </Modal>
    )
}

export default TextAreaModal;
