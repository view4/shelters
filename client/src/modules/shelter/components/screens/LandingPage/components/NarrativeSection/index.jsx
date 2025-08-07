import c from "classnames";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";
import styles from "./styles.module.scss";

const NarrativeSection = () => {
    return (
        <Container id="narrative" className={c(styles.section, styles.narrativeSection)}>
            <Container className={styles.contentWrapper}>
                {/* Header Section */}
                <Container className={styles.headerSection}>
                    <Title Element="h3" className={styles.sectionTitle}>
                        The Heart of the Matter
                    </Title>
                    <Container className={styles.decorativeDivider} />
                </Container>

                {/* Main Narrative Content */}
                <Container className={styles.narrativeContent}>
                    <Text className={styles.narrativeParagraph}>
                        We live in an age of endless optimization, where every moment is
                        measured, every habit tracked, every outcome quantified. Yet
                        something essential is missing:
                        <Text Element="span" className={c(styles.highlightedWord, styles.soulHighlight)}>
                            the soul
                        </Text>
                        of our experience.
                    </Text>

                    <Text className={styles.narrativeParagraph}>
                        Most time-tracking tools treat us like machines—focused on
                        efficiency, productivity, and measurable outcomes. But what about the
                        <Text Element="span" className={c(styles.highlightedWord, styles.qualityHighlight)}>
                            quality
                        </Text>
                        of our presence? The
                        <Text Element="span" className={c(styles.highlightedWord, styles.depthHighlight)}>
                            depth
                        </Text>
                        of our engagement?
                    </Text>

                    <Text className={styles.narrativeParagraph}>
                        What about the sacred pause between one moment and the next,
                        where wisdom lives and intention is born? We've lost touch with the art of mindful living—not because we don't want it,
                        but because our tools don't support it.
                    </Text>
                </Container>
            </Container>
        </Container>
    );
};

export default NarrativeSection;