import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";

const TextBlock = ({ text, children }) => (
    <Container>
        <Text>{text}</Text>
        {children}
    </Container>
);

export default TextBlock;