import cx from "classnames"
import Container from "modules/Core/components/ui-kit/Container";
import Link from "modules/Core/components/ui-kit/Link";
import Title from "modules/Core/components/ui-kit/Title";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useIsOpen } from "modules/Core/hooks/useIsOpen";
import Chevron from "modules/Core/components/ui-kit/Chevron";
import { links, WITH_PARAMS_PREFIX } from "./const";
import styles from "./styles.module.scss"


const Sidemenu = ({ header = "Booths" }) => {
    const { isOpen, toggle } = useIsOpen(true);
    const params = useParams();
    const boothId = params.boothId ?? params.id;

    const renderLink = useCallback((link) => {
        const to = (link.ignoreRouteParams || !boothId) ? link.to : `${WITH_PARAMS_PREFIX?.replace(':boothId', boothId)}${link.to}`;
        return (
            <Container key={link.to} className={styles.linkContainer}>
                <Link to={to} className={cx(styles.link)}>
                    {link.text}
                </Link>
            </Container>
        )
    })

    return (
        <Container relative lightShadow className={cx(styles.container, { [styles.closed]: !isOpen, [styles.open]: isOpen })} >
            <Container className={styles.header} relative>
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
                <Container/>
                <Container>
                    {links.slice(4,).map(renderLink)}
                </Container>
            </Container>
        </Container>
    )
};

export default Sidemenu