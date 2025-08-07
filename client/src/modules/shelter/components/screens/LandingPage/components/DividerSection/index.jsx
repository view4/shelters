import c from "classnames";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";
import styles from "./styles.module.scss";

const DividerSection = ({ 
    header = "Section Header", 
    body = "Section body text goes here." 
}) => {
    return (
        <Container className={c(styles.section, styles.dividerSection)}>
            <Container className={styles.contentWrapper}>
                <Container className={styles.headerSection}>
                    <Title Element="h2" className={styles.sectionHeader}>
                        {header}
                    </Title>
                    <Container className={styles.decorativeDivider} />
                </Container>
                
                <Container className={styles.bodySection}>
                    <Text className={styles.bodyText}>
                        {body}
                    </Text>
                </Container>
            </Container>
        </Container>
    );
};

export default DividerSection;