import c from "classnames";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";
import styles from "./styles.module.scss";
import { NATURE_COPY } from "../../consts";

const MEANINGFUL_ESSENTIALS = [
    // Left Column
    [
        {
            title: "Privacy as Sacred Trust",
            description: "Your inner world is sacred. We use end-to-end encryption and never sell your data. Your journey belongs to you alone.",
            dotColor: "blue"
        },
        {
            title: "Beyond Optimization",
            description: "We're not here to make you more productive. We're here to help you live more consciously, love more deeply, and align more authentically.",
            dotColor: "purple"
        },
        {
            title: "Wisdom Over Data",
            description: "Every metric serves meaning. Every number tells a story. We transform raw data into personal wisdom and spiritual insight.",
            dotColor: "blue"
        }
    ],
    // Right Column
    [
        {
            title: "Community of Hearts",
            description: "Connect with fellow travelers on the path of conscious living. Share insights, offer support, and learn from each other's journeys.",
            dotColor: "purple"
        },
        {
            title: "Gentle Technology",
            description: "Our design honors your nervous system. Soft colors, mindful interactions, and peaceful interfaces that invite presence rather than addiction.",
            dotColor: "crimson"
        },
        {
            title: "Earth-Conscious Impact",
            description: "We're committed to carbon neutrality and donate a portion of proceeds to environmental and social justice causes.",
            dotColor: "crimson"
        }
    ]
];

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
        <Container id="nature" className={c(styles.section, styles.essentialsSection)}>
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
                            {NATURE_COPY.INSIGHTS.slice(0, 2).map((essential, index) => (
                                <EssentialItem key={index} {...essential} />
                            ))}
                        </Container>
                        <Container className={styles.essentialsColumn}>
                            {NATURE_COPY.INSIGHTS.slice(2, 6).map((essential, index) => (
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