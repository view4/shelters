import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Card from "modules/Core/sub-modules/ui-kit/components/Card";
import AdminScreen from "../../AdminScreen";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import SubscriptionsFeed from "modules/membership/components/SubscriptionsFeed";
import styles from "./styles.module.scss";
import AdminPaymentsFeed from "modules/membership/components/AdminPaymentsFeed";

const SubscriptionsTab = () => (
    <Container className={styles.tabContainer}>
        <SubscriptionsFeed />
    </Container>
);

const PaymentsTab = () => (
    <Container className={styles.tabContainer}>
        <AdminPaymentsFeed />
    </Container>
);

const subscriptionsTabs = [
    {
        title: 'Subscriptions',
        Component: SubscriptionsTab
    },
    {
        title: 'Payments',
        Component: PaymentsTab
    }
];

export default () => {
    return (
        <AdminScreen>
            <Container maxHeight className={styles.container}>
                <Container className={styles.header}>
                    <Title text="Subscriptions" Element="h1" />
                </Container>
                <Card
                    className={styles.subscriptionsCard}
                    tabs={subscriptionsTabs}
                    lightShadow
                    borderless
                    maxWidth
                />
            </Container>
        </AdminScreen>
    );
};

