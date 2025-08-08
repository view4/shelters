import cx from "classnames";
import Card from "modules/Core/sub-modules/ui-kit/components/Card";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import styles from "./styles.module.scss";

const ClickableCard = ({ children, to, onClick, className, appendix, ...props }) => {
    return (
        <Card
            maxWidth maxHeight
            flex center
            alignCenter lightShadow
            {...props}
            className={cx(styles.container, className)}
        >
            <Button maxWidth maxHeight flex center alignCenter to={to} onClick={onClick} >{children}</Button>
            {appendix}
        </Card>
    )
}

export default ClickableCard;