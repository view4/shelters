import cx from 'classnames';
import Container from 'modules/Core/components/ui-kit/Container'
import Title from '../../Title';
import withShouldRender from 'modules/Core/higher-order-components/withShouldRender';
import ConditionalContainer from '../../ConditionalContainer';
import styles from './styles.module.scss'
// import UserGuideButton from 'modules/Core/sub-modules/Dialog/components/UserGuideButton';

const Header = ({ header, title = header, className, children, appendages, Element, userGuideKey, ...props }) => (
    <>
        <Container className={cx(styles.header, className)} relative flex alignCenter {...props}>
            {title && <Title className={styles.title} Element={Element}>{title}</Title>}
            {children}
            {/* <UserGuideButton userGuideKey={userGuideKey} /> */}
        </Container>
        <ConditionalContainer
            className={styles.fixedContainer}
            shouldRender={Boolean(props.fixed) || Boolean(props.absolute)}
        />
    </>
);

export default withShouldRender(Header);
