import cx from "classnames"
import { Button, Card, Container, Feature, Screen, Text, Title, Modal, Drawer, DrawerDialogue } from "modules/Core/sub-modules/ui-kit/exports"
import ShelterImage from "modules/shelter/assets/shelter.png";
import SpeciesImage from "modules/releases/assets/four-species.png"
import SukkahDwellingsImage from "modules/releases/assets/sukkah-dwelling.png"
import Etrog from "modules/releases/assets/etrog.png"
import Lulav from "modules/releases/assets/lulav.png"
import Myrtle from "modules/releases/assets/myrtle.png"
import Willow from "modules/releases/assets/willow.png"
import { useState } from "react";
import { AuthenticationButton } from "modules/auth/components";
import useAuth from "modules/auth/hooks/useAuth";
import { AUTH_MODES } from "modules/auth/components/AuthenticationButton";
import staticJSON from "../../../copy/sukkot-release.json"
import styles from "./styles.module.scss"

const { upcomingFeatures, prospectiveFeatures } = staticJSON;

const tabs = [
    {
        title: "Features in progress",
        Component: () => <Container className={styles.upcomingFeaturesTextContainer} p1>
            <Container mt1 />
            <Text>
                The following features are currently in development, either already started or comissioned.
            </Text>
            <Container mt1 />

            <Container>
                {upcomingFeatures.map((feature) => (
                    <Feature className={styles.upcomingFeature} key={feature.name} name={feature.name} card content={feature.description} />
                ))}
            </Container>
        </Container>
    },
    {
        title: "Prospective Features",
        Component: () => <Container p1>
            {/* <Title>Prospective Features</Title> */}
            <Container mt1 />

            <Text>These features are potential future features that we may consider adding in the future.</Text>
            <Container mt1 />

            <Container>
                {prospectiveFeatures.map((feature) => (
                    <Feature className={styles.prospectiveFeature} key={feature.name} name={feature.name} content={feature.description} card />
                ))}
            </Container>
        </Container>
    }
]
const UpcomingModal = ({ isOpen, onClose }) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose} borderless>
            <Card
                className={styles.upcomingFeaturesCard}
                // contentClassName={styles.upcoingFeaturesContent} 
                tabs={tabs}
                tabProps={{ activeTabIndex: 0 }}
                headerProps={{
                    className: styles.upcomingFeaturesHeader
                }}
                borderless
            />
        </Modal>
    )
}
const emojis = [
    {
        emoji: "🍋",
        top: "18%",
        left: "18%",
        animationDuration: "9s"
    },
    {
        emoji: "🌾",
        top: "72%",
        left: "72%",
        animationDuration: "10s"
    },
    {
        emoji: "🛖",
        top: "36%",
        left: "72%",
        animationDuration: "10s"
    },
    {
        top: "90%",
        left: "36%",
        animationDuration: "10s"
    },
    {
        emoji: "🌿",
        top: "54%",
        left: "54%",
        animationDuration: "10s"
    },
    {
        emoji: "⛺",
        top: "72%",
        left: "36%",
        animationDuration: "10s"
    },
    {
        emoji: "🍂",
        top: "54%",
        left: "18%",
        animationDuration: "10s"
    },
    {
        emoji: "🍷",
        top: "18%",
        left: "54%",
        animationDuration: "10s"
    },
    {
        emoji: "🎋",
        top: "18%",
        left: "90%",
        animationDuration: "10s"
    },
    {
        emoji: "🏜️",
        top: "36%",
        left: "36%",
        animationDuration: "10s"
    },
    {
        emoji: "🛤️",
        top: "54%",
        left: "90%",
        animationDuration: "10s"
    },
    {
        // emoji: "🎉",
        top: "90%",
        left: "18%",
        emoji: "🌴",

        animationDuration: "10s"
    }

]

const TitleWithSubtext = ({ title, subtext, className }) => {
    return (
        <Container className={cx(styles.titleWithSubtext, className)}>
            <Container className={styles.titleContainer}>
                <Title className={styles.title}>{title}</Title>
            </Container>
            <Container className={styles.subtextContainer}>
                <Text className={cx(styles.subtext)}>{subtext}</Text>
            </Container>
        </Container>
    )
}

const SukkotReleaseScreen = ({ title, releaseDate, features, links, narrative, hasError, releaseKey, intentionalText }) => {
    const [isUpcomingDrawerOpen, setIsUpcomingDrawerOpen] = useState(false);
    const [isSubscribitionModalOpen, setIsSubscribitionModalOpen] = useState(false);
    const [activeFeature, setActiveFeature] = useState(null);
    const { isAuthed } = useAuth();
    const [isHomepageHover, setIsHomepageHover] = useState(false);

    // Fixed decorative placements near corners
    const decorations = [
        { src: Etrog, alt: "Etrog", style: { top: "18%", left: "18%", width: "7rem", transform: "rotate(-8deg)", animationDuration: "9s", opacity: 0.25 } },
        { src: Lulav, alt: "Lulav", style: { top: "72%", right: "72%", width: "8rem", transform: "rotate(6deg)", animationDuration: "10s" } },
        { src: Myrtle, alt: "Myrtle", style: { bottom: "72%", left: "72%", width: "7rem", transform: "rotate(12deg)", animationDuration: "8s" } },
        { src: Willow, alt: "Willow", style: { bottom: "18%", right: "18%", width: "9rem", transform: "rotate(-10deg)", animationDuration: "11s" } },
    ];

    // Error state modal
    if (hasError) {
        return (
            <Screen>
                <Modal isOpen={true} onClose={() => window.history.back()}>
                    <Container p3 className={styles.errorModal}>
                        <Title>Release Not Found</Title>
                        <Container mt1 />
                        <Text>Sorry, we couldn't find the release data for "{releaseKey}". This release may not exist or there might be an issue loading the content.</Text>
                        <Container mt1 />
                        <Button text="Go Back" onClick={() => window.history.back()} />
                    </Container>
                </Modal>
            </Screen>
        );
    }

    return (
        <Screen>
            <Container className={cx(styles.container)}>
                <Card className={cx(styles.section, styles.welcomeSection)}>
                    <Container className={styles.sectionColumn}>
                        <Container className={styles.welcomeHeader}>
                            <Title>{title}</Title>
                            <Text className={styles.date}>{releaseDate}</Text>
                        </Container>
                        <Container className={styles.kadeshTextContainer}>
                            <Text italic className={styles.kadeshText}> For a seven day period you shall live in booths...<span>(Leviticus 23:40)</span> </Text>

                            {/* <Text className={styles.subText}></Text> */}
                        </Container>
                        <Container className={styles.urchatzContainer}>
                            <Text className={styles.urchatzText}>A digital space that supports the transient journey through Life.</Text>
                        </Container>
                    </Container>
                    <Container className={styles.sectionColumn}>
                        <Container className={styles.imageContainer}>
                            <img src={ShelterImage} alt="Shelter" />
                        </Container>
                    </Container>
                </Card>
                <Card relative center flex className={cx(styles.section, styles.featuresSection)}>
                    <Container absolute flex spaceBetween className={styles.featuresHeaderSection}>
                    </Container>
                    <Container absolute className={styles.featuresDecorations}>
                        {decorations.map((d, i) => (
                            <img key={i} src={d.src} alt={d.alt} className={styles.decoration} style={d.style} />
                        ))}
                    </Container>

                    <Container className={styles.featuresContent}>
                        <TitleWithSubtext title="Digital tools" subtext="Designed to help nurture your development and growth." />
                        <Container className={styles.featuresContainer} relative maxWidth >
                            {features.map((feature, index) => (
                                <Container
                                    key={index}
                                    className={styles.feature}
                                    onClick={() => setActiveFeature(feature)}
                                    role="button"
                                    aria-label={`View details for ${feature?.name || 'feature'}`}
                                >
                                    <Title>{feature.name}</Title>
                                </Container>
                            ))}
                        </Container>
                    </Container>

                </Card>
                <Card className={cx(styles.section, styles.narrativeSection)}>
                    <Container className={styles.narrativeContainer}>
                        <Container className={styles.narrativeDoodle1}></Container>
                        <Container className={styles.narrativeDoodle2}></Container>
                        <Container className={styles.narrativeDoodle3}></Container>
                        <Container className={styles.narrativeDoodle4}></Container>
                        <Text className={styles.narrativeText}>{narrative}</Text>
                    </Container>
                </Card>
                <Card className={cx(styles.section, styles.linksSection)}>
                    <Container
                        className={styles.linksSpeciesBackground}
                        style={{ backgroundImage: `url(${SpeciesImage})` }}
                    />
                    <Container
                        className={styles.linksSukkahDwellingsBackground}
                        style={{ backgroundImage: `url(${SukkahDwellingsImage})` }}
                    />
                    <Container className={styles.linksContainer}>

                        <TitleWithSubtext
                            className={styles.linksTitle}
                            title="Links"
                            subtext="Have fun exploring!"
                        />
                        <Container className={styles.buttonsContainer}>
                            <Container className={styles.primaryButtons}>
                                {!isAuthed && <AuthenticationButton
                                    className={cx(styles.funkyButton, styles.funkyButton2)}
                                    text={"Begin your Journey"}
                                    authMode={AUTH_MODES.REGISTER}
                                    fullWidth
                                />}
                                {isAuthed && <AuthenticationButton
                                    className={cx(styles.funkyButton, styles.funkyButton2)}
                                    text="Continue your Journey"
                                    to={"/"}
                                    fullWidth
                                />}
                                <Button
                                    className={cx(styles.funkyButton, styles.funkyButton2)}
                                    text={isHomepageHover ? "Visit homepage" : "Learn more"}
                                    to="/homepage"
                                    onMouseEnter={() => setIsHomepageHover(true)}
                                    onMouseLeave={() => setIsHomepageHover(false)}
                                    fullWidth
                                />
                            </Container>
                            <Container className={styles.secondaryButtons}>
                                <Button
                                    className={cx(styles.funkyButton, styles.upcomingButton)}
                                    text="What's next!"
                                    onClick={() => setIsUpcomingDrawerOpen(true)}
                                />
                                <Button
                                    className={cx(styles.funkyButton, styles.funkyButton3)}
                                    text="Share feedback"
                                    to="/releases/feedback"
                                />
                                <Button
                                    onClick={() => setIsSubscribitionModalOpen(true)}
                                    className={cx(styles.funkyButton, styles.funkyButton3)}
                                    text="Subscribe now!"
                                />
                            </Container>
                        </Container>
                    </Container>
                </Card>

                <UpcomingModal isOpen={isUpcomingDrawerOpen} onClose={() => setIsUpcomingDrawerOpen(false)} />
                <DrawerDialogue

                    isOpen={!!activeFeature}
                    onClose={() => setActiveFeature(null)}
                    className={styles.featureDrawer}
                    title={activeFeature?.name || 'Feature'}
                    children={activeFeature?.description || 'No description yet. More details coming soon.'}
                />
                <DrawerDialogue
                    isOpen={isSubscribitionModalOpen}
                    onClose={() => setIsSubscribitionModalOpen(false)}
                    className={styles.featureDrawer}
                    title="Booths Memberships!"
                    children={(
                        <Text>Members can access multiple booths, and more (upcoming) features, whilst subscription fees can help support this project to achieve sustainable growth.</Text>
                )}
                />
            </Container>
        </Screen>
    )
}

export default SukkotReleaseScreen