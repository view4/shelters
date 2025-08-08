import cx from 'classnames';
import Container from 'modules/Core/sub-modules/ui-kit/components/Container';
import Footer from '../layout/Footer';
import withRecursiveRender from 'modules/Core/higher-order-components/withRecursiveRender';
import TripanelScreen from './TripanelScreen';
import TripanelTabsScreen from './TripanelScreen/TripanelTabsScreen';
import Header from '../layout/Header';
import styles from './styles.module.scss';

const Screen = ({
    headerProps,
    footerProps,
    children,
    className,
    header,
    headerChildren,
    footer,
    backLink,
    forwardLink,
    HeaderComponent=Header,
    ...props
}) => (
    <Container className={cx(styles.container, className)} {...props}>
        <HeaderComponent shouldRender={Boolean(header || headerChildren)} title={header} children={headerChildren} />
        {/* <P4PHeader
            span
            shouldRender={Boolean(headerProps?.children || header)}
            title={header}
            children={headerChildren}
            {...headerProps}
            className={cx(headerProps?.className, styles.header)}
        /> */}
        {children}
        <Footer
            shouldRender={Boolean(footerProps?.children ?? footer)}
            children={footer}
            {...footerProps}
        />
    </Container>
)

export default 
    withRecursiveRender({
        tabs: TripanelTabsScreen,
        tripanel: TripanelScreen,
    }, Screen)
