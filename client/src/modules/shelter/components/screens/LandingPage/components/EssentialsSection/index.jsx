import c from "classnames";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";
import styles from "./styles.module.scss";
import { NATURE_COPY } from "../../consts";

const EssentialItem = ({ title, description, dotColor }) => (
    <Container className={styles.essentialItem}>
        <Container className={styles.titleContainer}>
            <Container className={c(styles.dotIndicator, styles[`dot-${dotColor}`])} />
            <Title Element="h4" className={styles.essentialTitle}>
                {title}
            </Title>
        </Container>
        <Text className={styles.essentialDescription}>
            {description}
        </Text>
    </Container>
);

const EssentialsSection = () => {
    return (
        <Container id="qualities" className={c(styles.section, styles.essentialsSection)}>
            <Container className={styles.contentWrapper}>
                {/* Header Section */}
                <Container className={styles.headerSection}>
                    <Title Element="h3" className={styles.sectionTitle}>
                        {NATURE_COPY.HEADING}
                    </Title>
                    <Container className={styles.decorativeDivider} />
                </Container>

                {/* Two-Column Grid */}
                <Container className={styles.essentialsGrid}>
                    {/* {NATURE_COPY.INSIGHTS.map((column, columnIndex) => ( */}
                        <Container className={styles.essentialsColumn}>
                            {NATURE_COPY.INSIGHTS.slice(0, 3).map((essential, index) => (
                                <EssentialItem key={index} {...essential} />
                            ))}
                        </Container>
                        <Container className={styles.essentialsColumn}>
                            {NATURE_COPY.INSIGHTS.slice(3, 7).map((essential, index) => (
                                <EssentialItem key={index} {...essential} />
                            ))}
                        </Container>
                    {/* ))} */}
                </Container>
            </Container>
        </Container>
    );
};

export default EssentialsSection;