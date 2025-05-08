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
            // COULDDO: Integrate header and footer into this component - maybe even as a hoc or something there... I'd love a generic way to do this with a hoc or a kind of a hook. 
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
