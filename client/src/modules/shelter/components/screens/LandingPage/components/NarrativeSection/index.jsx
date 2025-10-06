import c from "classnames";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";
import styles from "./styles.module.scss";
import { BACKGROUND_COPY } from "../../consts";
import ScrollNext from "../ScrollNext";

const NarrativeSection = () => {
    // Function to parse text and apply bold black styling to text wrapped in --
    const parseTextWithHighlights = (text) => {
        // Split the string into tokens that preserve markers for both --bold-- and __strike__
        const tokens = text.split(/(--[^-]+--|__[^_]+__)/g);

        return tokens.map((token, index) => {
            if (token.startsWith('--') && token.endsWith('--')) {
                const content = token.slice(2, -2);
                return (
                    <span key={index} className={styles.boldHighlight}>{content}</span>
                );
            }

            if (token.startsWith('__') && token.endsWith('__')) {
                const content = token.slice(2, -2);
                return (
                    <span key={index} className={styles.strikeHighlight}>{content}</span>
                );
            }

            return token;
        });
    };

    return (
        <Container id="background" className={c(styles.section, styles.narrativeSection)}>
            <Container className={styles.contentWrapper}>
                {/* Header Section */}
                <Container className={styles.headerSection}>
                    <Title Element="h3" className={styles.sectionTitle}>
                        {BACKGROUND_COPY.HEADING}
                    </Title>
                    <Container className={styles.decorativeDivider} />
                </Container>

                {/* Main Narrative Content */}
                <Container className={styles.narrativeContent}>
                    {BACKGROUND_COPY.TEXT.map((paragraph, index) => (
                        <Text key={index} className={styles.narrativeParagraph}>
                            {parseTextWithHighlights(paragraph)}
                        </Text>
                    ))}
                </Container>
            </Container>
            <ScrollNext className={styles.scrollNext} toId="connect" />
        </Container>
    );
};

export default NarrativeSection;