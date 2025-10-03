import cx from "classnames"
import { Button, Card, Container, Feature, Screen, Text, Title, Modal, Drawer, DrawerDialogue } from "modules/Core/sub-modules/ui-kit/exports"
import ShelterImage from "modules/shelter/assets/shelter.png";
import SpeciesImage from "modules/releases/assets/four-species.png"
import Etrog from "modules/releases/assets/etrog.png"
import Lulav from "modules/releases/assets/lulav.png"
import Myrtle from "modules/releases/assets/myrtle.png"
import Willow from "modules/releases/assets/willow.png"
import { useMemo, useState } from "react";
import styles from "./styles.module.scss"
import { AuthenticationButton } from "modules/auth/components";
import useAuth from "modules/auth/hooks/useAuth";
import { AUTH_MODES } from "modules/auth/components/AuthenticationButton";
import staticJSON from "../../../copy/sukkot-release.json"
const { upcomingFeatures, prospectiveFeatures } = staticJSON;
/*c

        background-image: url('data:image/svg+xml;utf8,\
  <svg xmlns="http://www.w3.org/2000/svg" width="240" height="56" viewBox="0 0 240 56">\
    <rect width="240" height="56" fill="none"/>\
    <g stroke="black" stroke-width="3" fill="none" stroke-linecap="round">\
      <!-- top row of thatch touching y=0 (flush) -->\
      <path d="M0 0 L20 28 L0 56"/>\
      <path d="M20 0 L40 28 L20 56"/>\
      <path d="M40 0 L60 28 L40 56"/>\
      <path d="M60 0 L80 28 L60 56"/>\
      <path d="M80 0 L100 28 L80 56"/>\
      <path d="M100 0 L120 28 L100 56"/>\
      <path d="M120 0 L140 28 L120 56"/>\
      <path d="M140 0 L160 28 L140 56"/>\
      <path d="M160 0 L180 28 L160 56"/>\
      <path d="M180 0 L200 28 L180 56"/>\
      <path d="M200 0 L220 28 L200 56"/>\
      <path d="M220 0 L240 28 L220 56"/>\
      <!-- second layer for texture -->\
      <path d="M10 0 L30 28 L10 56" opacity=' 0.55'/>\
      <path d="M30 0 L50 28 L30 56" opacity=' 0.55'/>\
      <path d="M50 0 L70 28 L50 56" opacity=' 0.55'/>\
      <path d="M70 0 L90 28 L70 56" opacity=' 0.55'/>\
      <path d="M90 0 L110 28 L90 56" opacity=' 0.55'/>\
      <path d="M110 0 L130 28 L110 56" opacity=' 0.55'/>\
      <path d="M130 0 L150 28 L130 56" opacity=' 0.55'/>\
      <path d="M150 0 L170 28 L150 56" opacity=' 0.55'/>\
      <path d="M170 0 L190 28 L170 56" opacity=' 0.55'/>\
      <path d="M190 0 L210 28 L190 56" opacity="0.55"/>\
      <path d="M210 0 L230 28 L210 56" opacity="0.55"/>\
    </g></svg>');
    */
const SkachSVG = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="240" height="56" viewBox="0 0 240 56">\
            <rect width="240" height="56" fill="none" />\
            <g stroke="black" stroke-width="3" fill="none" stroke-linecap="round">\
                {/* <!-- top row of thatch touching y=0 (flush) -->\ */}
                <path d="M0 0 L20 28 L0 56" />\
                <path d="M20 0 L40 28 L20 56" />\
                <path d="M40 0 L60 28 L40 56" />\
                <path d="M60 0 L80 28 L60 56" />\
                <path d="M80 0 L100 28 L80 56" />\
                <path d="M100 0 L120 28 L100 56" />\
                <path d="M120 0 L140 28 L120 56" />\
                <path d="M140 0 L160 28 L140 56" />\
                <path d="M160 0 L180 28 L160 56" />\
                <path d="M180 0 L200 28 L180 56" />\
                <path d="M200 0 L220 28 L200 56" />\
                <path d="M220 0 L240 28 L220 56" />\
                {/* <!-- second layer for texture -->\ */}
                <path d="M10 0 L30 28 L10 56" opacity=' 0.55' />\
                <path d="M30 0 L50 28 L30 56" opacity=' 0.55' />\
                <path d="M50 0 L70 28 L50 56" opacity=' 0.55' />\
                <path d="M70 0 L90 28 L70 56" opacity=' 0.55' />\
                <path d="M90 0 L110 28 L90 56" opacity=' 0.55' />\
                <path d="M110 0 L130 28 L110 56" opacity=' 0.55' />\
                <path d="M130 0 L150 28 L130 56" opacity=' 0.55' />\
                <path d="M150 0 L170 28 L150 56" opacity=' 0.55' />\
                <path d="M170 0 L190 28 L170 56" opacity=' 0.55' />\
                <path d="M190 0 L210 28 L190 56" opacity="0.55" />\
                <path d="M210 0 L230 28 L210 56" opacity="0.55" />\
            </g></svg>
    )
}


const tabs = [
    {
        title: "Features in progress",
        Component: () => <Container className={styles.upcomingFeaturesTextContainer} p1>
            {/* <Title>In Progress</Title> */}
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
    // const { header, content } = useTabs([{
    //     title: "In Progress",
    //     Component: () => <Container>
    //         <Title>In Progress</Title>
    //         <Text>These features are currently in progress and will be released in the future.</Text>
    //         <Container>
    //             {upcomingFeatures.map((feature) => (
    //                 <Feature key={feature.name} name={feature.name} description={feature.description} />
    //             ))}
    //         </Container>
    //     </Container>
    // }, {
    //     title: "Upcoming",
    //     Component: () => <Container>
    //         <Title>Upcoming</Title>
    //         <Text>These features are potential future features that we may consider adding in the future.</Text>
    //         <Container>
    //             {prospectiveFeatures.map((feature) => (
    //                 <Feature key={feature.name} name={feature.name} description={feature.description} />
    //             ))}
    //         </Container>
    //     </Container>
    // }]);

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
        emoji: "🌴",
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
        emoji: "༄",
        top: "90%",
        left: "90%",
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
        emoji: "🎉",
        top: "90%",
        left: "18%",
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

const ReleaseScreen = ({ title, releaseDate, features, links, narrative, hasError, releaseKey, intentionalText }) => {
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
                    <Container className={styles.bgEmojiContainer}>
                        {emojis.map((emoji, index) => (
                            <span
                                key={index}
                                className={styles.emoji}
                                style={{
                                    top: emoji.top,
                                    left: emoji.left,
                                    animationDuration: emoji.animationDuration
                                }}
                            >{emoji.emoji}</span>
                        ))}
                    </Container>
                    <Container className={styles.linksContainer}>
                        {/* <Container className={styles.welcomeTextContainer}>
                            <Container className={styles.intentionContainer}>
                                <Container className={styles.intentionBox}>
                                    <Text className={styles.intentionText}>
                                        {intentionalText}
                                    </Text>
                                </Container>
                            </Container>
                        </Container> */}
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

export default ReleaseScreen