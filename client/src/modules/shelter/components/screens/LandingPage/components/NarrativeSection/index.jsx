import c from "classnames";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";
import styles from "./styles.module.scss";
import { BACKGROUND_COPY } from "../../consts";

const NarrativeSection = () => {
    // Function to parse text and apply bold black styling to text wrapped in --
    const parseTextWithHighlights = (text) => {
        if (!text.includes('--')) {
            return text;
        }

        const parts = text.split(/(--[^-]+--)/g);
        
        return parts.map((part, index) => {
            if (part.startsWith('--') && part.endsWith('--')) {
                // Remove the -- markers and apply bold black styling
                const highlightText = part.slice(2, -2);
                
                return (
                    <span 
                        key={index} 
                        className={styles.boldHighlight}
                    >
                        {highlightText}
                    </span>
                );
            }
            return part;
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
        </Container>
    );
};

export default NarrativeSection;