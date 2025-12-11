import BoothsScreen from "modules/booths/components/screens/BoothsScreen";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import BoothsScreenHeader from "modules/shelter/components/BoothScreen/BoothScreenHeader";
import auth from "modules/auth/state";
import PaymentsFeed from "../../PaymentsFeed";
import { CancelMembershipButton } from "../membership-settings";
import { PAYMENTS } from "modules/payments/consts";

const Component = ({ userId }) => (
    <BoothsScreen
        header="My Subscription"
        infoKey={PAYMENTS.feed}
    >
        <BoothsScreenHeader
            header="My Payments"
            infoKey={PAYMENTS.feed}
        >
            <CancelMembershipButton />
            </BoothsScreenHeader>
        <PaymentsFeed userId={userId} />
    </BoothsScreen>
);


export default strappedConnected(
    Component,
    {
        user: auth.validateToken.selector,
    },
    {},
    ({ user }) => {
        return {
            userId: user?.id,
        }
    }
)