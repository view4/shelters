import Card from "modules/Core/components/ui-kit/Card"
import BoothScreen from "modules/shelter/components/BoothScreen"
import Button from "modules/Core/components/ui-kit/Button"
import strappedConnected from "modules/Core/higher-order-components/strappedConnected"
import cells from "modules/membership/state/index"
import Features from "modules/Core/components/ui-kit/Features"
import Container from "modules/Core/components/ui-kit/Container"
import styles from "./styles.module.scss"


const { cancelMembership } = cells;
const MembershipSettings = ({ cancelMembership }) => {
    return (
        <BoothScreen
            header="Membership Settings"
            className={styles.container}
            flex
        >
            <Container className={styles.contentContainer}>
                <Card className={styles.card} relative>
                    <Features

                        features={[
                            {
                                name: "Cancel Membership",
                                // change to a modal button and handle via that please. 
                                content: <Button onClick={cancelMembership}>Cancel</Button>
                            }
                        ]}
                        row
                    />
                    <Container absolute bottom flex flexEnd fullWidth maxWidth p1>
                        <Button m1>
                            Save
                        </Button>
                    </Container>
                </Card>
            </Container>
        </BoothScreen>
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