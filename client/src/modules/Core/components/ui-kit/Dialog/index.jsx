import c from 'classnames';
import { Snackbar } from "@mui/material"
import styles from "./styles.module.scss";

const Dialog = ({
    isOpen,
    duration = 3600,
    close,
    type,
    ...props
}) => (
    <Snackbar
        className={c(styles.container, { [styles[type]]: Boolean(type) })}
        open={isOpen}
        onClose={close}
        autoHideDuration={duration}
        {...props}
    />
);

export default Dialog;