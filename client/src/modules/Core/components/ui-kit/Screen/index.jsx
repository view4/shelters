import cx from 'classnames';
import Container from 'modules/Core/components/ui-kit/Container';
import Footer from '../layout/Footer';
// import P4PHeader from 'modules/P4P/components/P4PHeader';
import withRecursiveRender from 'modules/Core/higher-order-components/withRecursiveRender';
import TripanelScreen from './TripanelScreen';
import TripanelTabsScreen from './TripanelScreen/TripanelTabsScreen';
import styles from './styles.module.scss';
import Header from '../layout/Header';


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
    ...props
}) => (
    <Container className={cx(styles.container, className)} {...props}>
        <Header title={header}/>
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
