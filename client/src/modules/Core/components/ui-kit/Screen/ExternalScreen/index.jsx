import cx from 'classnames'
import Container from "../../Container/index.jsx";
import Screen from "../index.jsx";
import Link from "../../Link/index.jsx";
import styles from "./styles.module.scss";

const ExternalScreen = ({ className, children, headerChildren, ...props }) => (
    <Screen
        className={cx(styles.screen, className)}
        headerProps={{ className: styles.header }}
        footer={<Footer />}
        footerProps={{ className: styles.footer }}
        // header={'People 4 Progress'}
        header={true}
        {...props}
    >
        {children}
    </Screen>
);


const Footer = () => (
    <Container maxWidth flex flexEnd span center alignCenter>
        <Link
            to={"/privacy"}
            text={"Privacy Policy"}
            className={styles.privacy}
        />
    </Container>
);


export default ExternalScreen;
