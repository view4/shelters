import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import BoothsScreenHeader from "modules/shelter/components/BoothScreen/BoothScreenHeader";
import auth from "modules/auth/state";
import PaymentsFeed from "../../PaymentsFeed";
import { PAYMENTS } from "modules/payments/consts";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import cells from "modules/membership/state/index";
import BoothScreen from "modules/shelter/components/BoothScreen";
import styles from "./styles.module.scss";
const { cancelMembership } = cells;

const CancelSubscriptionButton = strappedConnected(Button, {}, { cancelMembership: cancelMembership.action }, ({ cancelMembership }) => ({
    onConfirm: cancelMembership,
    text: "Cancel Subscription",
    className: styles.cancelButton,
    modal: true,
    copy: {
        title: "Are you sure you want to cancel your subscription?",
        description: "This action will cancel your subscription and you will no longer have access to your membership.",
        onCancel: "Cancel",
        onConfirm: "Cancel Subscription",
    },
}));

const Component = ({ userId }) => (
    <BoothScreen
        header="My Subscription"
        infoKey={PAYMENTS.feed}
    >
        <BoothsScreenHeader
            header="My Payments"
            infoKey={PAYMENTS.feed}
            className={styles.header}
            options={[
                { Component: CancelSubscriptionButton, props: { userId, className: styles.cancelButton } },
            ]}
        >
        </BoothsScreenHeader>
        <PaymentsFeed userId={userId} />
    </BoothScreen>
);


export default strappedConnected(
    Component,
    {
        user: auth.validateToken.selector,
    },
    {},
    ({ user }) => {
        console.log("user", user);
        return {
            userId: user?.id,
        }
    }
)