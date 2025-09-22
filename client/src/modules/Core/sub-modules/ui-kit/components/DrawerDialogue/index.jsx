import { Dialog, DialogTitle, DialogContent, DialogActions, Slide, IconButton } from "@mui/material"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Button from "../Button";
import { forwardRef } from "react";
import styles from "./styles.module.scss";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DrawerDialogue = ({
    isOpen,
    onClose,
    children,
    title,
    subtitle,
    actions,
    hasCancel = true,
    origin = "bottom",
    size = "md"
}) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            TransitionComponent={Transition}
            keepMounted
            sx={{
                '& .MuiDialog-container': {
                    alignItems: origin === "bottom" ? "flex-end" : "flex-start",
                },
                '& .MuiDialog-paper': {
                    width: size === "sm" ? "min(32.5rem, 94vw)" : size === "md" ? "min(42.5rem, 94vw)" : "min(57.5rem, 96vw)",
                },
            }}
        >
            <DialogTitle sx={{ position: 'relative' }}>
                {title}
                <IconButton
                    aria-label="Close"
                    onClick={onClose}   
                    sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
                >
                    <CloseRoundedIcon />
                </IconButton>
            </DialogTitle>
            {subtitle && <DialogTitle variant="subtitle1">{subtitle}</DialogTitle>}
            <DialogContent className={styles.content}>{children}</DialogContent>
            <DialogActions>
                {hasCancel && <Button onClick={onClose}>Cancel</Button>}
                {actions && actions?.map((action) => (
                    <Button onClick={action.onClick}>{action.text}</Button>
                ))}
            </DialogActions>
        </Dialog>
    )
}

export default DrawerDialogue;