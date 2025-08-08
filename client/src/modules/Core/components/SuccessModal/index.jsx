import React from 'react'
import Container from 'modules/Core/sub-modules/ui-kit/components/Container';
import Modal from "modules/Core/sub-modules/ui-kit/components/Modal";
import styles from "./styles.module.scss"

const SuccessModal = ({text, onClose, isOpen}) => {
    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <Container className={styles.container}>
                {text}
            </Container>
        </Modal>
    )
}

export default SuccessModal