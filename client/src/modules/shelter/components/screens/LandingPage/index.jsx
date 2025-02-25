import c from "classnames";
import Screen from "modules/Core/components/ui-kit/Screen";
import Container from "modules/Core/components/ui-kit/Container";
import styles from "./styles.module.scss";
import Footer from "modules/Core/components/ui-kit/layout/Footer";
import Title from "modules/Core/components/ui-kit/Title";
import Card from "modules/Core/components/ui-kit/Card";
import Text from "modules/Core/components/ui-kit/Text";
import { ESSENTIALS, FEATURES } from "./consts";


const FeatureCard = ({ name, description }) => (
    <Card className={styles.featureCard} header={name}>
        <Text>
            {description}
        </Text>
    </Card>
);

const LandingPage = () => {
    return (
        <Screen 
            header="Shelters App"
            headerChildren={
                <Container>
                    {/* if authed then display link to app */}
                    <Button to="/register">
                        Register Now
                    </Button>
                    <Button to="/login">
                        Login
                    </Button>
                </Container>
            }
        >
            <Container className={c(styles.section, styles.welcomeSection)}>
                {/* Welcome Section */}
                <Container flex maxHeight maxWidth>
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
            <Container className={c(styles.section)}>
                {/* Features Section */}
                {FEATURES.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                ))}
            </Container>

            <Container className={c(styles.section)}>
                {/* Essence Section */}
                {ESSENTIALS.map((essential, index) => (
                    <FeatureCard key={index} {...essential} />
                ))}

            </Container>
            <Container className={c(styles.section)}>
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
            <Container className={c(styles.section)}>
                {/* Connect Section */}
                <Container>
                    <Text>
                        You are welcome to check out this project, and to start your journey today.
                    </Text>
                </Container>
                <Container>
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