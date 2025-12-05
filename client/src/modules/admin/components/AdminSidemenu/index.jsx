import cx from "classnames";
import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Link from "modules/Core/sub-modules/ui-kit/components/Link";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import { useIsOpen } from "modules/Core/hooks/useIsOpen";
import { links } from "./const";
import SidemenuLink from "modules/shelter/components/BoothScreen/Sidemenu/SidemenuLink";
import styles from "./styles.module.scss";

const AdminSidemenu = ({ header = "Admin" }) => {
    const { isOpen } = useIsOpen(true);
    const location = useLocation();

    const renderLink = useCallback((link) => {
        const to = link.to;
        const isActive = location.pathname.includes(to);
        const Component = link.Component ?? SidemenuLink;

        return (
            <Component
                key={to}
                to={to}
                text={link.text}
                isActive={isActive}
                className={styles.linkContainer}
            />
        );
    }, [location.pathname]);

    return (
        <Container
            relative
            lightShadow
            className={cx(styles.container, { [styles.closed]: !isOpen, [styles.open]: isOpen })}
        >
            <Container className={cx(styles.header, { [styles.active]: location.pathname === "/admin" })} relative>
                <Link to="/admin">
                    <Title>{header}</Title>
                </Link>
            </Container>
            <Container className={styles.links}>
                <Container>
                    {links.map(renderLink)}
                </Container>
            </Container>
        </Container>
    );
};

export default AdminSidemenu;

