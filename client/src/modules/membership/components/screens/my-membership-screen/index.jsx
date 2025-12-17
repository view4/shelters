// import BoothsScreen from "modules/booths/components/screens/BoothsScreen";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import BoothsScreenHeader from "modules/shelter/components/BoothScreen/BoothScreenHeader";
import auth from "modules/auth/state";
import MembershipPaymentsScreen from "../membership-payments-screen";
import { Card, Link } from "modules/Core/sub-modules/ui-kit/exports";
import BoothScreen from "modules/shelter/components/BoothScreen";
import PaymentsFeed from "../../PaymentsFeed";

const Component = ({ hasMembership }) => {
    if (hasMembership) return (
        <MembershipPaymentsScreen />
    )

    return (
        <BoothScreen
            header="My Subscription"
        >
            <BoothsScreenHeader
                header="My Subscription"

            />
            <Card>
                You do not have a membership yet. press <Link to="/subscribe">here</Link>to learn what a membership can do for you.
            </Card>
            <PaymentsFeed />
        </BoothScreen>
    )

}


export default strappedConnected(
    Component,
    {
        membership: auth.validateToken.selectors.membership,
    },
    {},
    ({ membership }) => {
        return {
            hasMembership: Boolean(membership?.id),
        }
    }
)