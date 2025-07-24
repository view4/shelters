import { CircularProgress } from "@mui/material"
import cx from "classnames"
import styles from "./styles.module.scss"
import withRecursiveRender from "modules/Core/higher-order-components/withRecursiveRender";

export const CircularLoader = ({ className, size, color }) => {
    return (
        <div className={cx(styles.container, className)}>
            <CircularProgress size={size} color={color} />
        </div>
    )
};

export const OverlayLoader = ({ className, size, color, loading }) => {
    return loading && (
        <CircularLoader className={cx(styles.overlayContainer, className)} size={size} color={color} />
    )
}

const Loader = ({ className, size, color, children, loading }) => (
    loading ? <CircularLoader className={className} size={size} color={color} /> : children
)

export default withRecursiveRender(
    { overlay: OverlayLoader },
    Loader
);
