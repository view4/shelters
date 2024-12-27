import React from 'react'
import Container from '../ui-kit/Container';
import Modal from "../ui-kit/Modal";
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