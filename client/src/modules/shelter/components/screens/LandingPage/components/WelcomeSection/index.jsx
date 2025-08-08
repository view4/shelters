import c from "classnames";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import { GENERAL_COPY, WELCOME_COPY } from "../../consts";
import ShelterImage from "modules/shelter/assets/shelter.png";
import styles from "./styles.module.scss";

const WelcomeSection = () => {
    return (
        <Container id="home" className={c(styles.section, styles.welcomeSection)}>
            <Container className={styles.contentWrapper}>
                <Container className={styles.gridContainer}>
                    {/* Left Content */}
                    <Container className={styles.leftContent}>
                        {/* Brand Name */}
                        <Title className={styles.brandTitle}>
                            {GENERAL_COPY.NAME}
                        </Title>

                        {/* Headline */}
                        <Container  alignCenter>
                            <Title Element="h2" className={styles.headline}>
                                {WELCOME_COPY.HEADLINE}
                            </Title>
                            <Text className={styles.headlineSuffix}>{WELCOME_COPY.HEADLINE_SUFFIX}</Text>
                        </Container>


                        {/* Subtext */}
                        <Text className={styles.subtext}>
                            {WELCOME_COPY.SUBTEXT}
                        </Text>

                        {/* CTA Button */}
                        <Container className={styles.ctaContainer}>
                            <Button onClick={() => {
                                // scroll into fiew the #get-going section
                                document.getElementById("get-going")?.scrollIntoView({ behavior: "smooth" });
                            }} className={styles.ctaButton}>
                                <Text className={styles.ctaText}>{WELCOME_COPY.CTA}</Text>
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
                <Container mb3 className={styles.scrollIndicator}>
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