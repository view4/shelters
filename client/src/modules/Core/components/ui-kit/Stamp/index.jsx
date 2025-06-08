import cx from "classnames";
import Container from "modules/Core/components/ui-kit/Container";
import Text from "../Text";
import Date from "../Date";
import styles from "./styles.module.scss";

const _formatter = (date) => {
    if(!date) return '';
    const d = new window.Date(date);
    return `${String(d.getDate()).padStart(2, '0')}·${String(d.getMonth() + 1).padStart(2, '0')}·${d.getFullYear()}`;
}

const Stamp = ({ 
    nature='ocean_blue', 
    stamp, 
    timestamp, 
    className,
    formatter = _formatter,
    ...props
 }) => {
    return (
        <Container
            className={cx(styles.container, className, { [styles[nature]]: true })}
            column flex justifyCenter alignCenter  
            {...props}
        >
            <Text text={stamp} />
            <Date date={timestamp} formatter={formatter} />
        </Container>
    )
};

export default Stamp;