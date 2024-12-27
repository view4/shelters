
import cx from 'classnames';
import styles from "./styles.module.scss";

const Tag = ({ text, onDelete, children, className, nature='purple', size='md', grey }) => (
    <span
        className={cx(
            styles.container,
            className,
            {
                [styles.grey]: Boolean(grey), 
                [styles[nature]]: Boolean(nature),
                [styles[size]]:Boolean(size)
            }
        )}
    >
        {text ?? children} {onDelete && <span onClick={onDelete} className={styles.x} >X</span>}
    </span>
)

export default Tag
