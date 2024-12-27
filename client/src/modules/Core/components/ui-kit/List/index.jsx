import cx from 'classnames'
import withUIKitClasses from 'modules/Core/higher-order-components/withUIKitClasses';
import styles from './styles.module.scss';

const List = ({ items, className, renderItem }) => (
    <ol className={cx(styles.list, className)}>
        {
            items.map((item, index) => (
                <li key={index}>
                    {item}
                </li>
            ))
        }
    </ol>
)

export default withUIKitClasses(List);