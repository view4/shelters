import c from "classnames";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";
import styles from "./styles.module.scss";
import { FEATURES_COPY } from "../../consts";
import ScrollNext from "../ScrollNext";


const FeatureCard = ({ name, description, details, icon, bg, inscription, emblem, className }) => (
    <Container className={c(styles.featureCard, className)}>
        <Container className={c(styles.iconContainer, styles[bg])}>
            {emblem}
        </Container>
        <Title Element="h4" className={styles.cardTitle}>
            {name}
        </Title>
        <Text className={styles.cardDescription}>
            {description}
        </Text>
        <Container className={styles.cardDetails}>
            <Text className={styles.detailsText}>
                {inscription}
            </Text>
        </Container>
    </Container>
);

const FeaturesSection = () => {
    return (
        <Container id="features" className={c(styles.section, styles.featuresSection)}>
            <Container className={styles.contentWrapper}>
                {/* Header Section */}
                <Container className={styles.headerSection}>
                    <Title Element="h3" className={styles.sectionTitle}>
                        {FEATURES_COPY.HEADING}
                    </Title>
                    <Container className={styles.decorativeDivider} />
                </Container>

                {/* Features Grid */}
                <Container className={styles.featuresGrid}>
                    {FEATURES_COPY.FEATURES.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </Container>
            </Container>
            <ScrollNext toId="qualities" />
        </Container>
    );
};

export default FeaturesSection;