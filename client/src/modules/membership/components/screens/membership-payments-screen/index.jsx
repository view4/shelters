import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import BoothsScreenHeader from "modules/shelter/components/BoothScreen/BoothScreenHeader";
import auth from "modules/auth/state";
import PaymentsFeed from "../../paymentsFeed";
import { PAYMENTS } from "modules/payments/consts";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import cells from "modules/membership/state/index";
import BoothScreen from "modules/shelter/components/BoothScreen";

const { cancelMembership } = cells;

const CancelSubscriptionButton = strappedConnected(Button, {}, { cancelMembership: cancelMembership.action }, ({ cancelMembership }) => ({
    onClick: cancelMembership,
    text: "Cancel Subscription",
}));

const Component = ({ userId }) => (
    <BoothScreen
        header="My Subscription"
        infoKey={PAYMENTS.feed}
    >
        <BoothsScreenHeader
            header="My Payments"
            infoKey={PAYMENTS.feed}
        >
            <CancelSubscriptionButton />
            </BoothsScreenHeader>
        <PaymentsFeed userId={userId} />
    </BoothScreen>
);


export default strappedConnected(
    Component,
    {
        userId: auth.validateToken.selector,
    },
    {},
    ({ user }) => {
        return {
            userId: user?.id,
        }
    }
)