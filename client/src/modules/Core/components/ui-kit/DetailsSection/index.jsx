import Container from "modules/Core/components/ui-kit/Container";
import c from "classnames";
import Title from "modules/Core/components/ui-kit/Title";
import styles from "./styles.module.scss";

const DetailsSection = ({
    title,
    sectionTitle = title,
    children,
    childrenContainerProps,
    shouldRender = true,
    className,
    contentContainerClassName,
    bordered = true,
}) => shouldRender && (
    <Container className={c(styles.container, className)}>
        <Title className={styles.subtitle} Element="h4" >{sectionTitle}</Title>
        <Container 
            className={c(styles.contentContainer, contentContainerClassName, {[styles.bordered]: bordered},)} 
            column flex 
            {...childrenContainerProps}
        >
            {children}
        </Container>
    </Container>
);

export default DetailsSection;