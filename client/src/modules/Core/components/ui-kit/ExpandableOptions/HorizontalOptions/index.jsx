import cx from 'classnames';
import ExpandableOptions from '..';
import styles from './styles.module.scss';

const HorizontalOptions = ({ options, className, label, openClassName }) => (
    <ExpandableOptions
        className={cx(className, styles.horizontalOptions)}
        openClassName={cx(styles.open, openClassName)}
        label={label}
        options={options}
    />
);

export default HorizontalOptions;
