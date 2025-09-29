import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import styles from "./styles.module.scss";

const ScrollNext = ({ toId, ariaLabel = "Scroll to next section", className }) => {
    const handleClick = () => {
        if (!toId) return;
        const container = document.getElementById("landing-container");
        const target = document.getElementById(toId);
        if (container && target) {
            container.scrollTo({ top: target.offsetTop, behavior: "smooth" });
        } else if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <Container mb3 className={`${styles.scrollNext} ${className || ""}`} onClick={handleClick} role="button" aria-label={ariaLabel}>
            <svg className={styles.scrollIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
        </Container>
    );
};

export default ScrollNext;


