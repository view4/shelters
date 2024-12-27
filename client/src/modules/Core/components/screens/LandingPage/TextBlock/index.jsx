import Container from "modules/Core/components/ui-kit/Container";
import Text from "modules/Core/components/ui-kit/Text";

const TextBlock = ({ text, children }) => (
    <Container>
        <Text>{text}</Text>
        {children}
    </Container>
);

export default TextBlock;