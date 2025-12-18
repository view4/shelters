import { useMemo } from "react";
import strapped from "modules/Core/higher-order-components/strapped";
import paymentsFeed from "modules/payments/state/feed";
import styles from "./styles.module.scss";

export default strapped(paymentsFeed.FeedComponent, ({ userId }) => ({
    // feed: MOCK_DATA,
    filters: useMemo(() => ({ userId }), [userId]),
    table: true,
    columns: [
        {
            key: "paidAt",
            label: "Paid At",
        },
        {
            key: "notes",
            label: "Notes",
            render: () => "Subscription Payment",
        },
        {
            key: "amount",
            label: "Amount",
        },
        {
            key: "receiptUrl",
            label: "Receipt URL",
            parser: (value) => <a href={value} target="_blank" rel="noreferrer">{"receipt"}</a>,
        },
    ],
}));