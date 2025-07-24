import cx from 'classnames';
import Widget from '..';
import Card from '../../Card';
import styles from './styles.module.scss';

const WidgetCard = ({card, label, className, ...props}) => (
    <Widget 
        {...props} 
        className={cx(styles.container, className)} 
        header={label} 
        Component={Card} 
    />
);

export default WidgetCard;