import c from "classnames";
import cells from "modules/auth/state";
import Screen from "modules/Core/components/ui-kit/Screen";
import Container from "modules/Core/components/ui-kit/Container";
import Footer from "modules/Core/components/ui-kit/layout/Footer";
import Title from "modules/Core/components/ui-kit/Title";
import Card from "modules/Core/components/ui-kit/Card";
import Text from "modules/Core/components/ui-kit/Text";
import Button from "modules/Core/components/ui-kit/Button";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import { ReactComponent as WelcomeBg } from "../../../assets/welcome_bg_cleaned.svg";
import { ESSENTIALS, FEATURES } from "./consts";
import Link from "modules/Core/components/ui-kit/Link";
import styles from "./styles.module.scss";

const FeatureCard = ({ name, description, className }) => (
    <Card className={c(styles.featureCard, className)} header={name}>
        <Text>
            {description}
        </Text>
    </Card>
);

const LINKS = [
    {
        label: "homepage",
        to: "/shelter"

    },
    {
        label: "contact",
        to: "/contact"
    },
    {
        label: "policies",
        to: "/policies"
    }
]


export const SheltersFooter = () => (
    <Footer>
        <Container flex spaceBetween alignCenter p1 maxHeight>
            <Text>
                Shelters Project
            </Text>
            <Container flex>
                {LINKS.map((link, index) => (
                    <>
                        <Link className={styles.footerLink} key={index} to={link.to}>
                            {link.label}
                        </Link>
                        {index !== LINKS.length - 1 && <span className={styles.dot}>&#183;</span>}
                    </>
                ))}
            </Container>
        </Container>
    </Footer>
)

const LandingPage = ({ isAuthed }) => {
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
                        <WelcomeBg />
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
                    <Card className={styles.narrativeCard}>
                        <Text>
                            The vast tech world is saturated with so much;
                            yet it's hard to sometimes find the meaning shining through the products out there
                            amidst a lot of noise
                            I wanted to provide a place to return
                            and facilitate growth in a meaningful manner.

                            I didn't find an existing app which was meeting my practical organisational needs,
                            nor one which was intentioned towards personal and individual growth.
                        </Text>
                    </Card>
                    <Card className={styles.narrativeCard}>
                        <Text>
                            Not intended to be coorperately inclined,
                            the primary intention is to facilitate and support the personal journey
                            towards growth,
                            and I want to share this with peers because I believe that
                            this carries meaning to people as well,
                            and I want to exist in a world where we nurture and support each other's growth as one.
                        </Text>
                    </Card>
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
                    <Button to="/register" nature="ocean-blue">
                        Register Now
                    </Button>
                    <Button to="/login">
                        Login
                    </Button>
                    <Container span />
                    <Button to="/subscribe">
                        Subscribe
                    </Button>
                </Container>
            </Container>
            <SheltersFooter />
        </Screen>
    )
}

export default strappedConnected(
    LandingPage,
    { isAuthed: cells.validateToken.selectors.isAuthed },
    {},
    () => ({})
);