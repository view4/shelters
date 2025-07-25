import cx from "classnames"
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Link from "modules/Core/sub-modules/ui-kit/components/Link";
import styles from "./styles.module.scss"

const SidemenuLink = ({ to, text, isActive, containerRef, children, className, ...props }) => {
    return (
        <Container
            key={to}
            ref={containerRef}
            className={cx(styles.linkContainer, className, { [styles.active]: isActive })}
            {...props}
        >
            <Link to={to}  className={styles.link} {...props}>
                {text}
            </Link>
            {children}
        </Container>
    )
};

export default SidemenuLink;