import c from "classnames";
import { useMemo, useState, useCallback } from "react";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";
import styles from "./styles.module.scss";
import { NATURE_COPY } from "../../consts";
import ScrollNext from "../ScrollNext";

const EssentialsSection = () => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    // Balanced base positions for doodles (desktop). Mobile stacks are handled in CSS.
    const positions = useMemo(() => [
        { top: "18%", left: "18%", duration: "8s" },
        { top: "36%", left: "36%", duration: "9s" },
        { top: "18%", left: "54%", duration: "10s" },
        { top: "36%", left: "72%", duration: "7.5s" },
        { top: "36%", left: "0%", duration: "8.5s" },
        { top: "54%", left: "18%", duration: "9.5s" },
        { top: "54%", left: "54%", duration: "8.75s" },
    ], []);

    const onToggle = useCallback((index) => {
        setExpandedIndex((current) => (current === index ? null : index));
    }, []);

    return (
        <Container id="qualities" className={c(styles.section, styles.essentialsSection)}>
            <Container className={styles.contentWrapper}>
                <Container className={styles.headerSection}>
                    <Title Element="h3" className={styles.sectionTitle}>
                        {NATURE_COPY.HEADING}
                    </Title>
                    <Container className={styles.decorativeDivider} />
                </Container>

                {/* Floating doodles canvas */}
                <Container className={styles.doodlesCanvas} relative>
                    {NATURE_COPY.INSIGHTS.slice(0, 7).map((essential, index) => (
                        <Container
                            key={index}
                            role="button"
                            tabIndex={0}
                            aria-expanded={expandedIndex === index}
                            className={c(styles.doodle, expandedIndex === index && styles.expanded)}
                            onClick={() => onToggle(index)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    onToggle(index);
                                }
                            }}
                            style={{
                                top: positions[index % positions.length].top,
                                left: positions[index % positions.length].left,
                                animationDuration: positions[index % positions.length].duration,
                            }}
                        >
                            <Title Element="h4" className={styles.doodleTitle}>{essential.title}</Title>
                            <Text className={styles.doodleDescription}>{essential.description}</Text>
                        </Container>
                    ))}
                </Container>
            </Container>
            <ScrollNext toId="background" />
        </Container>
    );
};

export default EssentialsSection;