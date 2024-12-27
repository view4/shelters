import Container from "modules/Core/components/ui-kit/Container";
import Text from "modules/Core/components/ui-kit/Text";
import Title from "modules/Core/components/ui-kit/Title";
import withCard from "../Card/withCard";
import styles from "./styles.module.scss";

const Feature = ({ name, content, TitleElement, renderContent, ...props }) => (
    <Container {...props}>
        <Title Element={TitleElement}>{name}</Title>
        <Text>{renderContent ? renderContent(content) : content}</Text>
    </Container>
)

export default withCard(Feature, styles.card);