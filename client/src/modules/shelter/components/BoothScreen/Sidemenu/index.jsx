import cx from "classnames"
import { useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Link from "modules/Core/sub-modules/ui-kit/components/Link";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import { useIsOpen } from "modules/Core/hooks/useIsOpen";
import Chevron from "modules/Core/sub-modules/ui-kit/components/Chevron";
import { links, WITH_PARAMS_PREFIX } from "./const";
import SidemenuLink from "./SidemenuLink";
import useFocusedBoothId from "modules/booths/hooks/useFocusedBoothId";
import styles from "./styles.module.scss"


const Sidemenu = ({ header = "Booths" }) => {
    const { isOpen, toggle } = useIsOpen(true);
    const boothId = useFocusedBoothId()
    const location = useLocation();

    const renderLink = useCallback((link) => {
        const to = (link.ignoreRouteParams || !boothId) ? link.to : `${WITH_PARAMS_PREFIX?.replace(':boothId', boothId)}${link.to}`;
        const isActive = location.pathname.includes(to);
        const Component = link.Component ?? SidemenuLink;

        return (
            <Component
                to={to}
                text={link.text}
                isActive={isActive}
                className={styles.linkContainer}
            />
        )
    }, [location.pathname, boothId])

    const onHeaderTo = useMemo(() => {
        if (!boothId) return "/"
        return `/booths/${boothId}`
    }, [boothId])

    return (
        <Container
            relative
            lightShadow
            className={cx(styles.container, { [styles.closed]: !isOpen, [styles.open]: isOpen })}
        >
            <Container className={cx(styles.header, { [styles.active]: location.pathname === "/" })} relative>
                <Link to={onHeaderTo}>
                    <Title>{header}</Title>
                </Link>
                <Container className={styles.toggleContainer}>
                    {/* <Chevron nature='left'
                        className={cx(styles.chevron, { [styles.open]: isOpen })}
                        onClick={toggle}
                    /> */}
                </Container>
            </Container>
            <Container className={styles.links}>
                <Container>
                    {links.slice(0, 4).map(renderLink)}
                </Container>
                <Container />
                <Container>
                    {links.slice(4,).map(renderLink)}
                </Container>
            </Container>
        </Container>
    )
};

export default Sidemenu