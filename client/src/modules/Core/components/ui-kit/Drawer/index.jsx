import cx from 'classnames'
import { Drawer as _Drawer } from "@mui/material"
import Container from '../Container';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import ConditionalContainer from '../ConditionalContainer';
import Chevron from '../Chevron';
import styles from "./styles.module.scss";

const Drawer = ({
    isOpen,
    children,
    header,
    close,
    origin = "bottom",
    className,
    footer,
    footerProps,
    headerChildren,
    size = "lg",
    backdrop = true,
    headerClassName
}) => {
    return (
        <>
            <ConditionalContainer className={cx(styles.backdrop, { [styles.open]: backdrop && isOpen })} onClick={close} />
            <Container
                className={cx({
                    [styles.container]: true,
                    [styles.open]: isOpen,
                    [className]: Boolean(className),
                    [styles[origin]]: true,
                    [styles[size]]: true,
                })}
            >
                <ConditionalContainer shouldRender={isOpen} maxWidth>
                    <Header header={header} className={cx(styles.header, headerClassName)} spaceBetween>
                        {headerChildren}
                        <Chevron nature={origin} onClick={close} className={styles.chevron} />
                    </Header>
                    {children}
                    <Footer
                        shouldRender={Boolean(footer)}
                        className={styles.footer}
                        {...footerProps}
                    >
                        {footer}
                    </Footer>
                </ConditionalContainer>
            </Container>
        </>
    )
}

export default Drawer