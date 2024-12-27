import cx from 'classnames';
import ExpandableCard from 'modules/Core/components/ui-kit/Card/ExpandableCard';
import styles from './styles.module.scss'
import withRecursiveRender from 'modules/Core/higher-order-components/withRecursiveRender';
import WidgetCard from './WidgetCard';

const Widget = ({ className, children, label, gridRow, Component = ExpandableCard, ...props }) => (
    <Component
        size={"xlg"}
        className={cx(styles.container, className)}
        label={label}
        defaultOpen
        style={{ gridRow }}
        contentClassName={styles.content}
        userGuideClassName={styles.ugb}
        {...props}
    >
        {children}
    </Component>
)

export default withRecursiveRender({
    card: WidgetCard
}, Widget);