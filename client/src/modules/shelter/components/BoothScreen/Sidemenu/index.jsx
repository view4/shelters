import cx from "classnames"
import Container from "modules/Core/components/ui-kit/Container";
import styles from "./styles.module.scss"
import Link from "modules/Core/components/ui-kit/Link";
import Title from "modules/Core/components/ui-kit/Title";
import { useCallback } from "react";
import { useParams } from "react-router-dom";

const links = [
    {
        text: "Roadmaps",
        to: "/roadmaps"
    },
    {
        text: "Cycles",
        to: "/cycles"
    },
    {
        text: "Entries",
        to: "/entries"
    },
    {
        text: "Time",
        to: "/time-mapping"
    },
    {
        text: "Info",
        to: "/info"
    },
    {
        text: "Booths",
        to: "/booths",
        ignoreRouteParams: true,
    },
    {
        text: "Settings",
        to: "/membership/settings",
        ignoreRouteParams: true
    },
];

const withParamsPrefix = `/booths/:boothId`


const Sidemenu = ({ header = "Booths" }) => {
    const params = useParams();
    const boothId = params.boothId ?? params.id;

    const renderLink = useCallback((link) => {
        const to = (link.ignoreRouteParams || !boothId) ? link.to : `${withParamsPrefix?.replace(':boothId', boothId)}${link.to}`;
        return (
            <Container key={link.to} className={styles.linkContainer}>
                <Link to={to} className={cx(styles.link)}>
                    {link.text}
                </Link>
            </Container>
        )
    })

    return (
        <Container lightShadow className={styles.container}>
            <Container  className={styles.header}>
                <Link to="/">
                <Title>{header}</Title>
                </Link>
            </Container>
            <Container className={styles.links}>
                <Container>
                    {links.slice(0, 4).map(renderLink)}
                </Container>
                <Container>

                </Container>
                <Container>
                    {links.slice(4,).map(renderLink)}
                </Container>
            </Container>

        </Container>
    )
};

export default Sidemenu