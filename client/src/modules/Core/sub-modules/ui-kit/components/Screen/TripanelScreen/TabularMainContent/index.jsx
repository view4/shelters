import cx from 'classnames';
import Container from 'modules/Core/sub-modules/ui-kit/components/Container';
import styles from './styles.module.scss';

const TabularMainContent = ({
    className,
    header,
    content,
    tabsHeader,
    headerClassName
}) => {
    return (
        <Container className={cx(styles.container, className)}>
            <Container className={cx(styles.headerContainer, headerClassName)}>
                {header}
                {tabsHeader}
            </Container>
            <Container className={styles.contentContainer}>
                {content}
            </Container>
        </Container>
    )
};

export default TabularMainContent;