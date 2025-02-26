import Screen from "modules/Core/components/ui-kit/Screen"
import Button from "modules/Core/components/ui-kit/Button"
import strappedConnected from "modules/Core/higher-order-components/strappedConnected"
import { cancelMembership } from "modules/membership/state/index"
import Features from "modules/Core/components/ui-kit/Features"
import styles from "./styles.module.scss"


const MembershipSettings = ({ cancelMembership }) => {
    return (
        <Screen flex>
            <Container>
                <Features
                    features={[
                        {
                            name: "Cancel Membership",
                            content: <Button onClick={cancelMembership}>Cancel</Button>
                        }
                    ]}
                />
            </Container>
        </Screen>
    )
}

export default strappedConnected(
    MembershipSettings,
    {},
    {
        cancelMembership: cancelMembership.action
    },
    ({ cancelMembership }) => {

        return {
            cancelMembership
        }
    }
);