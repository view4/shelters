import cx from 'classnames';
import ExpandableOptions from '..';
import styles from './styles.module.scss';

const HorizontalOptions = ({ options, className, label }) => (
    <ExpandableOptions
        className={cx(className, styles.horizontalOptions)}
        openClassName={styles.open}
        label={label}
        options={options}
    />
);

export default HorizontalOptions;
