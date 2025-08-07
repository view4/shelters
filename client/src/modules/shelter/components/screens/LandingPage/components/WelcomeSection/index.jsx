import c from "classnames";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import { ReactComponent as WelcomeBg } from "modules/shelter/assets/welcome_bg_cleaned.svg";
import ShelterImage from "modules/shelter/assets/shelter.png";
import styles from "./styles.module.scss";

const WelcomeSection = () => {
    return (
        <Container id="welcome" className={c(styles.section, styles.welcomeSection)}>
            <Container className={styles.contentWrapper}>
                <Container className={styles.gridContainer}>
                    {/* Left Content */}
                    <Container className={styles.leftContent}>
                        {/* Brand Name */}
                        <Title className={styles.brandTitle}>
                            Shelters
                        </Title>

                        {/* Headline */}
                        <Title Element="h2" className={styles.headline}>
                            A sacred space for mindful time and meaningful moments
                        </Title>

                        {/* Subtext */}
                        <Text className={styles.subtext}>
                            Track not just your time, but the depth and intention behind each
                            moment. Discover patterns that align with your deepest values.
                        </Text>

                        {/* CTA Button */}
                        <Container className={styles.ctaContainer}>
                            <Button to="/retreat" className={styles.ctaButton}>
                                <Text className={styles.ctaText}>Begin Your Journey</Text>
                            </Button>
                        </Container>
                    </Container>

                    {/* Right Illustration */}
                    <Container className={styles.rightContent}>
                        <Container className={styles.illustrationWrapper}>
                            <img src={ShelterImage} alt="Shelters illustration" className={styles.illustration} />
                        </Container>
                    </Container>
                </Container>

                {/* Scroll indicator */}
                <Container className={styles.scrollIndicator}>
                    <svg
                        className={styles.scrollIcon}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                    
                </Container>
            </Container>
        </Container>
    );
};

export default WelcomeSection;