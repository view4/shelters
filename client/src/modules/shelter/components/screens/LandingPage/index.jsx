import cells from "modules/auth/state";
import Screen from "modules/Core/sub-modules/ui-kit/components/Screen";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Footer from "modules/Core/sub-modules/ui-kit/components/layout/Footer";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import Link from "modules/Core/sub-modules/ui-kit/components/Link";
import WelcomeSection from "./components/WelcomeSection";
import FeaturesSection from "./components/FeaturesSection";
import EssentialsSection from "./components/EssentialsSection";
import NarrativeSection from "./components/NarrativeSection";
import ConnectionSection from "./components/ConnectionSection";
import DividerSection from "./components/DividerSection";
import Header from "./components/Header";
import { OPENING_INTENTION_COPY, INTRA_INTENTION_COPY } from "./consts";
import styles from "./styles.module.scss";

const LINKS = [
    {
        label: "homepage",
        to: "/homepage"

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
                {/* Shelters Project */}
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
            HeaderComponent={() => <Header isAuthed={isAuthed} />}
            className={styles.container}
        >
            <WelcomeSection />
            <DividerSection
                header={false}
                // header="Why Shelters?"
                body={OPENING_INTENTION_COPY.TEXT}
            />
            <FeaturesSection />
            <EssentialsSection />
            <NarrativeSection />
            <DividerSection
                header={false}
                // header="Begin Your Journey"
                body={INTRA_INTENTION_COPY.TEXT}
            />
            <ConnectionSection isAuthed={isAuthed} />
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