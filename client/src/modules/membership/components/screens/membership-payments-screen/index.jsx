import BoothsScreen from "modules/booths/components/screens/BoothsScreen";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import BoothsScreenHeader from "modules/shelter/components/BoothScreen/BoothScreenHeader";
import auth from "modules/auth/state";
import PaymentsFeed from "../../paymentsFeed";

const Component = ({ userId }) => (
    <BoothsScreen
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
    </BoothsScreen>
);


export default strappedConnected(
    Component,
    {
        userId: auth.selectors.userId,
    },
    {},
    ({ userId }) => {
        return {
            userId,
        }
    }
)