import cx from 'classnames';
import Title from '..';
import styles from "./styles.module.scss";
import Container from '../../Container';

const BorderedTitle = ({ bordered, borderStyle, className, borderColor, ...props }) => (
    <Container
        className={cx(
            styles.container,
            { 
                [styles[borderStyle]]: Boolean(borderStyle),
                [styles[borderColor]]: Boolean(borderColor),
                [className]: Boolean(className)
            }
        )}>
        <Title {...props} />
    </Container>
);

export default BorderedTitle;