import Card from "modules/Core/sub-modules/ui-kit/components/Card";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";

const FeedRowItem = ({ data }) => (
    <Card>
        {Object.entries(data).map(([key, value]) => (
            <Container key={key}>
                <Text>{value}</Text>
            </Container>
        ))}
    </Card>
);

export default FeedRowItem;

