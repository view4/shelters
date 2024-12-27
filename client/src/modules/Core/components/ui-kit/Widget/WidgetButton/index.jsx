import cx from 'classnames'
import PanelButton from '../../PanelButton';
import styles from "./styles.module.scss";
import Title from '../../Title';

const WidgetButton = ({text, className, widget, gridRow, ...props}) => (
    <PanelButton
        text={<Title text={text} Element={'h4'} />}
        className={cx(styles.widget, className)}
        style={{gridRow}}
        {...props}
    />
)

export default WidgetButton