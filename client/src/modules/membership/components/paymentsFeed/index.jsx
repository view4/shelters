import { useMemo } from "react";
import strapped from "modules/Core/higher-order-components/strapped";
import paymentsFeed from "modules/payments/state/feed";
import styles from "./styles.module.scss";

const MockData = [
    {
        amount: 100,
        paidAt: "2021-01-01",
        externalId: "1234567890",
        user: "John Doe",
        receiptUrl: "https://www.google.com",
    },
    {
        amount: 200,
        paidAt: "2021-01-02",
        externalId: "1234567891",
        user: "Jane Doe",
        receiptUrl: "https://www.google.com",
    },
];

const FeedHeader = () => (
    <div className={styles.feedHeader}>
        <div className={styles.headerCell}>Amount</div>
        <div className={styles.headerCell}>Date</div>
        <div className={styles.headerCell}>Transaction ID</div>
        <div className={styles.headerCell}>User</div>
        <div className={styles.headerCell}>Receipt</div>
    </div>
);

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(date);
};

const FeedItem = ({ amount, paidAt, externalId, user, receiptUrl }) => (
    <div className={styles.feedItem}>
        <div className={styles.amount}>{formatCurrency(amount)}</div>
        <div className={styles.date}>{formatDate(paidAt)}</div>
        <div className={styles.externalId}>{externalId}</div>
        <div className={styles.user}>{user}</div>
        <a
            href={receiptUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.receiptLink}
        >
            View Receipt
        </a>
    </div>
)

const PaymentsFeedWrapper = ({ feed, ...props }) => (
    <div className={styles.feedContainer}>
        <FeedHeader />
        <paymentsFeed.FeedComponent
            feed={feed}
            ItemComponent={FeedItem}
            {...props}
        />
    </div>
);

export default strapped(PaymentsFeedWrapper, ({ userId }) => ({
    filters: useMemo(() => ({ userId }), [userId]),
    feed: MockData,
}));