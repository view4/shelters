import Screen from "modules/Core/components/ui-kit/Screen";
import Container from "modules/Core/components/ui-kit/Container";
import Title from "modules/Core/components/ui-kit/Title";
import Button from "modules/Core/components/ui-kit/Button";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import cells from "modules/auth/state";
import { SheltersFooter } from "../LandingPage";
import Features from "modules/Core/components/ui-kit/Features";
import styles from "./styles.module.scss";

const PoliciesPage = ({ isAuthed }) => {
    return (
        <Screen
            header="Shelters App"
            headerChildren={
                <Container className={styles.headerChildren} flexEnd flex p1>
                    {!isAuthed ? (<>
                        <Button to="/register">
                            Register Now
                        </Button>
                        <Button to="/login">
                            Login
                        </Button>
                    </>) : <Button to="/booths">Booths → </Button>}
                </Container>
            }
            className={styles.screen}
        >
            <Container mt3 className={styles.container}>
                <Features
                    features={[
                        {
                            content: <Title>Policies</Title>
                        },
                        {
                            name: "Refund & Cancellation Policy",
                            content: "You may request a refund within 7 days of purchase. Subscriptions can be canceled anytime via email or within your user dashboard.",
                        },
                        {
                            name: "Terms & Disclaimer",
                            content: "By using this service, you agree to our terms. We provide services as-is and are not liable for misuse or failure outside our control.",
                        },
                    ]}
                />

            </Container>
            <SheltersFooter />
        </Screen>
    )
}

export default strappedConnected(
    PoliciesPage,
    { isAuthed: cells.validateToken.selectors.isAuthed },
    {},
    () => ({})
);