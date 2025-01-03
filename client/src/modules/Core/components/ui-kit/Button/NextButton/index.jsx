import cx from 'classnames';
import { EastArrow } from 'modules/Core/components/ui-kit/indicators';
import Button from '..';
import styles from './styles.module.scss';

const NextButton = ({ className, onClick, text, children, ...props }) => (
    <Button
        {...props}
        className={cx(styles.next, className)}
        onClick={onClick}
    >
        {text ?? children}
        <EastArrow />
    </Button>
)

export default NextButton;