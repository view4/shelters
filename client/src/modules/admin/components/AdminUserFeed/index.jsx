import strapped from "modules/Core/higher-order-components/strapped";
import Card from "modules/Core/sub-modules/ui-kit/components/Card";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";
import feed from "../../state/feed";
import { formatDate } from "modules/Core/utils/date";

export const FeedRowItem = ({ data }) => (
    <Card>
        {Object.entries(data).map(([key, value]) => (
            <Container key={key}>
                <Text>{value}</Text>
            </Container>
        ))}
    </Card>
);

const FeedItem = ({ id, email, username, firstName, lastName }) => (
    <FeedRowItem data={{
        email,
        username: username || "No username",
        name: [firstName, lastName].filter(Boolean).join(" ") || "No name",
    }} />
);

export default strapped(feed.FeedComponent, () => ({
    table: true,
    columns: [
        {
            key: "id",
            label: "ID",
        },
        {
            key: "email",
            label: "Email",
        },
        {
            key: "createdAt",
            label: "Created At",
            parser: formatDate,
        },
        {
            key: "boothCount",
            label: "Booth Count",
        },
    ],
}));

