import c from "classnames";
import Screen from "modules/Core/components/ui-kit/Screen";
import Container from "modules/Core/components/ui-kit/Container";
import styles from "./styles.module.scss";
import Footer from "modules/Core/components/ui-kit/layout/Footer";
import Title from "modules/Core/components/ui-kit/Title";
import Card from "modules/Core/components/ui-kit/Card";
import Text from "modules/Core/components/ui-kit/Text";
import { ESSENTIALS, FEATURES } from "./consts";
import Button from "modules/Core/components/ui-kit/Button";


const FeatureCard = ({ name, description, className }) => (
    <Card className={c(styles.featureCard, className)} header={name}>
        <Text>
            {description}
        </Text>
    </Card>
);

const LandingPage = ({ isAuthed = true }) => {
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
                    </>) : <Button to="/booths">Booths →  </Button>}
                </Container>
            }
            className={styles.container}
        >
            <Container className={c(styles.section, styles.welcomeSection)}>
                {/* Welcome Section */}
                <Container flex center maxHeight maxWidth fullWidth>
                    <Container flex col center className={styles.textContainer}>
                        <Title>
                            Start your journey today!
                        </Title>
                        <Title Element="h5">
                            Shelters provides a space for you to be able to grow and nurture your journey, helping you connect with what is important to you.
                        </Title>
                    </Container>
                    <Container maxHeight className={styles.graphic} >
                    </Container>
                </Container>
            </Container>
            <Container className={c(styles.section, styles.featuresSection)}>
                {/* Features Section */}
                {FEATURES.map((feature, index) => (
                    <FeatureCard key={index} className={styles.featuresCard} {...feature} />
                ))}
            </Container>

            <Container className={c(styles.section, styles.essentialsSection)}>
                {/* Essence Section */}
                {ESSENTIALS.map((essential, index) => (
                    <Container>
                        <FeatureCard key={index} className={styles.essentialsCard}  {...essential} />
                    </Container>
                ))}

            </Container>
            <Container className={c(styles.section, styles.narrativeSection)}>
                {/* Narrative Section */}
                <Container>
                    <Container>
                        <Text>
                            The vast tech world is saturated with so much;
                            yet it's hard to sometimes find the meaning shining through the products out there
                            amidst a lot of noise
                            I wanted to provide a place to return
                            and facilitate growth in a meaningful manner.

                            I didn't find an existing app which was meeting my practical organisational needs,
                            nor one which was intentioned towards personal and individual growth.
                        </Text>
                    </Container>
                    <Container>
                        <Text>
                            Not intended to be coorperately inclined,
                            the primary intention is to facilitate and support the personal journey
                            towards growth,
                            and I want to share this with peers because I believe that
                            this carries meaning to people as well,
                            and I want to exist in a world where we nurture and support each other's growth as one.
                        </Text>
                    </Container>
                </Container>
            </Container>
            <Container className={c(styles.section, styles.connectionSection)}>
                {/* Connect Section */}
                <Container>
                    <Text>
                        You are welcome to check out this project and start your journey today.
                    </Text>
                </Container>
                <Container className={styles.connectionsContainer}>
                    <Button to="/register">
                        Register Now
                    </Button>
                    <Button to="/login">
                        Login
                    </Button>
                    <Button to="/subscribe">
                        Subscribe
                    </Button>
                </Container>
            </Container>
            <Footer>
                Shelters Project
            </Footer>
        </Screen>
    )
}

export default LandingPage;