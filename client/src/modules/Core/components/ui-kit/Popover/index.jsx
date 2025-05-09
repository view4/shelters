import cx from 'classnames';
import React from 'react';
import { Popover as _Popover } from "@mui/material"
import Container from '../Container';
import styles from "./styles.module.scss";

const Popover = ({ 
    children, 
    onClose, 
    anchorElement, 
    bodyClassName, 
    isOpen,
    verticalOrigin = 'bottom',
    horizontalOrigin = 'left',
    ...props
}) => {
    return (
        <_Popover
            open={isOpen}
            onClose={onClose}
            anchorEl={anchorElement}
            anchorOrigin={{
                vertical: verticalOrigin,
                horizontal: horizontalOrigin,
            }}
            transformOrigin={{
                vertical: verticalOrigin,
                horizontal: horizontalOrigin,
            }}
            {...props}
        >
            <Container className={cx(styles.body, bodyClassName)}>
                {children}
            </Container>
        </_Popover>
    )
}

export default Popover
