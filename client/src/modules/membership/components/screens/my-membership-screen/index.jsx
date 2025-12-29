import BoothsScreen from "modules/booths/components/screens/BoothsScreen";

import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import BoothsScreenHeader from "modules/shelter/components/BoothScreen/BoothScreenHeader";
import auth from "modules/auth/state";
import MembershipPaymentsScreen from "../membership-payments-screen";
import { Card, Container, Link, Button } from "modules/Core/sub-modules/ui-kit/exports";
import BoothScreen from "modules/shelter/components/BoothScreen";
import styles from "./styles.module.scss";
import emptyImage from "modules/membership/assets/empty.png";

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
            <Container maxWidth center flex col>
                <Card borderless flex col mt3 center contentClassName={styles.contentContainer}>
                    <img src={emptyImage} alt="No subscription" className={styles.emptyImage} />

                    <b>You do not have a subscription yet</b>
                    <br />
                    There is plenty on offer here without an active subscription!
                    <br />
                    <br />
                    However, 
                    subscriptions offer a way of committing more to the usage of this space to enhance personal growth and development. You can cancel at any time. 

                    <br />
                    <br />
                    <Button className={styles.learnMoreButton} nature="grey" text="Learn More" to="/subscribe" />
                </Card>
            </Container>
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