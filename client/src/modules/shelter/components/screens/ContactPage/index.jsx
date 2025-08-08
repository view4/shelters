import Screen from "modules/Core/sub-modules/ui-kit/components/Screen";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import cells from "modules/auth/state";
import Features from "modules/Core/sub-modules/ui-kit/components/Features";
import { SheltersFooter } from "../LandingPage";
import styles from "./styles.module.scss";


const ContactPage = ({ isAuthed }) => {
    return (
        <Screen
            header="Shelters App"
            headerChildren={
                <Container className={styles.headerChildren} flexEnd flex p1>
                    {/* if authed then display link to app */}
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
                            content: <Title>Contact Us</Title>
                        },
                        {
                            name: "Email",
                            content: "morrisgaby987@gmail.com",
                        },
                        { content: <Container mt3 /> },
                        {
                            content: "For any questions about your subscription or usage, please reach out to us by email.",
                        },
                    ]}
                // row
                />

            </Container>
            <SheltersFooter />
        </Screen>
    )

}

export default strappedConnected(
    ContactPage,
    { isAuthed: cells.validateToken.selectors.isAuthed },
    {},
    () => ({})
);