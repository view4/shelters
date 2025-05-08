import cx from "classnames"
import { useLocation } from "react-router-dom";
import Container from "modules/Core/components/ui-kit/Container";
import Link from "modules/Core/components/ui-kit/Link";
import Title from "modules/Core/components/ui-kit/Title";
import { useCallback, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useIsOpen } from "modules/Core/hooks/useIsOpen";
import Chevron from "modules/Core/components/ui-kit/Chevron";
import { links, WITH_PARAMS_PREFIX } from "./const";
import ActiveBoothsPreview from "./ActiveBoothsPreview";
import styles from "./styles.module.scss"

const SidemenuLink = ({ to, text, isActive, containerRef, children, ...props }) => {
    return (
        <Container
            key={to}
            ref={containerRef}
            className={cx(styles.linkContainer, { [styles.active]: isActive })}
            {...props}
        >
            <Link to={to} {...props}>
                {text}
            </Link>
            {children}
        </Container>
    )
};

const BoothsLink = ({ ...props }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    return (
        <>
            <SidemenuLink
                containerRef={containerRef}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                to="/booths"
                text="Booths"
                {...props}
            >
                <ActiveBoothsPreview onClose={() => setIsOpen(false)} isOpen={isOpen} containerElement={containerRef.current} />
            </SidemenuLink>
        </>
    )
};

const Sidemenu = ({ header = "Booths" }) => {
    const { isOpen, toggle } = useIsOpen(true);
    const params = useParams();
    const boothId = params.boothId ?? params.id;
    const location = useLocation();

    const renderLink = useCallback((link) => {
        const to = (link.ignoreRouteParams || !boothId) ? link.to : `${WITH_PARAMS_PREFIX?.replace(':boothId', boothId)}${link.to}`;
        const isActive = location.pathname.includes(to);
        const Component = link.to === "/booths" ? BoothsLink : SidemenuLink;

        return (
            <Component
                to={to}
                text={link.text}
                isActive={isActive}
            />
        )
    }, [location.pathname, boothId])

    return (
        <Container
            relative
            lightShadow
            className={cx(styles.container, { [styles.closed]: !isOpen, [styles.open]: isOpen })}
        >
            <Container className={cx(styles.header, { [styles.active]: location.pathname === "/" })} relative>
                <Link to="/">
                    <Title>{header}</Title>
                </Link>
                <Container className={styles.toggleContainer}>
                    <Chevron nature='left'
                        className={cx(styles.chevron, { [styles.open]: isOpen })}
                        onClick={toggle}
                    />
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