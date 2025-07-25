import cx from 'classnames';
import React from 'react';
import { Modal as _Modal } from "@mui/material"
import Container from '../Container';
import styles from "./styles.module.scss";

const Modal = ({ children, onClose, bodyClassName, isOpen }) => {
    return (
        <_Modal
            // COULDDO: Integrate header and footer into this component - maybe even as a hoc or something there... I'd love a generic way to do this with a hoc or a kind of a hook. 
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Container className={cx(styles.body, bodyClassName)}>
                {children}
            </Container>
        </_Modal>
    )
}

export default Modal