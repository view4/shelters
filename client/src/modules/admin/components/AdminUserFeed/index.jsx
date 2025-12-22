import strapped from "modules/Core/higher-order-components/strapped";
import feed from "../../state/feed";
import { formatDate } from "modules/Core/utils/date";


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

