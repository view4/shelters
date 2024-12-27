import cx from 'classnames';
import Card from "modules/Core/components/ui-kit/Card";
import { openInNewTab } from "modules/Core/utils/window";
import styles from "./styles.module.scss";
import withCustomClasses from 'modules/Core/higher-order-components/withCustomClasses';

const classes = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
}

const LinkCard = ({ link, className }) => (
    <Card
        children={link?.name ?? link?.url}
        className={cx(styles.container, className)}
        onClick={() => openInNewTab(link?.url)}
    />
);

export default withCustomClasses(LinkCard, classes);