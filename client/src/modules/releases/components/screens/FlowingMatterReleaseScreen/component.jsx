import cx from "classnames"
import { Button, Card, Container, Feature, Screen, Text, Title, Modal, Drawer, DrawerDialogue } from "modules/Core/sub-modules/ui-kit/exports"
import ShelterImage from "modules/shelter/assets/shelter.png";
import JourneyImage from "modules/releases/assets/journey.png"
import SpeciesImage from "modules/releases/assets/four-species.png"
import SukkahDwellingsImage from "modules/releases/assets/sukkah-dwelling.png"
import Etrog from "modules/releases/assets/checklist.png"
import Lulav from "modules/releases/assets/roadmap.png"
import Myrtle from "modules/releases/assets/timer.png"
import Willow from "modules/releases/assets/journal.png"
import { useMemo, useState } from "react";
import styles from "./styles.module.scss"
import { AuthenticationButton } from "modules/auth/components";
import useAuth from "modules/auth/hooks/useAuth";
import { AUTH_MODES } from "modules/auth/components/AuthenticationButton";
import staticJSON from "../../../copy/sukkot-release.json"
import { Link } from "modules/Core/sub-modules/ui-kit/components/Link";
const { upcomingFeatures, prospectiveFeatures } = staticJSON;


// const tabs = [
//     {
//         title: "Features in progress",
//         Component: () => <Container className={styles.upcomingFeaturesTextContainer} p1>
//             {/* <Title>In Progress</Title> */}
//             <Container mt1 />
//             <Text>
//                 The following features are currently in development, either already started or comissioned.
//             </Text>
//             <Container mt1 />

//             <Container>
//                 {upcomingFeatures.map((feature) => (
//                     <Feature className={styles.upcomingFeature} key={feature.name} name={feature.name} card content={feature.description} />
//                 ))}
//             </Container>
//         </Container>
//     },
//     {
//         title: "Prospective Features",
//         Component: () => <Container p1>
//             {/* <Title>Prospective Features</Title> */}
//             <Container mt1 />

//             <Text>These features are potential future features that we may consider adding in the future.</Text>
//             <Container mt1 />

//             <Container>
//                 {prospectiveFeatures.map((feature) => (
//                     <Feature className={styles.prospectiveFeature} key={feature.name} name={feature.name} content={feature.description} card />
//                 ))}
//             </Container>
//         </Container>
//     }
// ]
const UpcomingModal = ({ isOpen, onClose }) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose} borderless>
            <Card
                className={styles.upcomingFeaturesCard}
                // tabProps={{ activeTabIndex: 0 }}
                headerProps={{
                    className: styles.upcomingFeaturesHeader
                }}
                header="What's new?!"
                borderless
            >
                <Container flex >
                    You can catch the previous release <Link to="/releases/sukkot"> here.</Link>
                </Container>
                <Container mt1 />
                <Text>Since the previous release - functional subscriptions have been added, and (behind the scenes) there's a new admin dashboard to keep track of the of internal usage now some users have started utilising and exploring the space. </Text>

            </Card>
        </Modal>
    )
}

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

const ReleaseScreen = ({ title, releaseDate, features, links, narrative, hasError, releaseKey, intentionalText, featuresSubtext, releaseTitle, releaseSubtitle }) => {
    const [isUpcomingDrawerOpen, setIsUpcomingDrawerOpen] = useState(false);
    const [isSubscribitionModalOpen, setIsSubscribitionModalOpen] = useState(false);
    const [activeFeature, setActiveFeature] = useState(null);
    const { isAuthed } = useAuth();
    const [isHomepageHover, setIsHomepageHover] = useState(false);

    // Fixed decorative placements near corners
    const decorations = [
        { src: Willow, alt: "Etrog", style: { top: "25%", left: "18%", width: "7rem", transform: "rotate(-8deg)", animationDuration: "9s", opacity: 0.25 } },
        { src: Myrtle, alt: "Lulav", style: { top: "72%", right: "72%", width: "8rem", transform: "rotate(6deg)", animationDuration: "10s" } },
        { src: Lulav, alt: "Myrtle", style: { top: "18%", left: "72%", width: "7rem", transform: "rotate(12deg)", animationDuration: "8s" } },
        { src: Etrog, alt: "Willow", style: { top: "72%", right: "18%", width: "9rem", transform: "rotate(-10deg)", animationDuration: "11s" } },
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
                            <Text italic className={styles.kadeshText}> {releaseTitle} </Text>

                            {/* <Text className={styles.subText}></Text> */}
                        </Container>
                        <Container className={styles.urchatzContainer}>
                            <Text className={styles.urchatzText}>A digital space that supports the transient journey through Life.</Text>
                        </Container>
                    </Container>
                    <Container className={styles.sectionColumn}>
                        <Container className={styles.imageContainer}>
                            <img src={JourneyImage} alt="Shelter" />
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
                        <TitleWithSubtext title="Digital tools" subtext={featuresSubtext} />
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
                        <Text className={styles.narrativeText}>

                        <b>where u goin shawty?</b>
                        <br/>
                        <br/>
                        if u been on that daily hustle and grind but struggle to feel in tune with the journey or the meaning within.... then dude/dudette perk up your ears, cause the answer for you may be here...!
                        <br/><br/>
                        Dis space was designed to help connect with the transient, meaningful journey of personal development, to help u get ur yearning hands on <b>BALANCE</b> and <b>ABUNDANCE</b> with ease. 
                        <br/>
                        <br/>
                        so if that don't sound like your cup of tea.... back off <b>SLIMEBALL</b> and stop reading NOW.
                        <br/>
                        <br/>
                        Seeds grow and are nourished by water and stuff, and ideas are nourished too, and this seedling of an idea was inspired by sukkot, the jewish harvest festival, which explores themes of journeying, the transient human experience, and hereness... wow, woo, journeys, humans, hereness !? 
                        <br/>
                        <br/>
                        and that's why this app gives transient spaces for journeying with life in a balanced way which invites YOU to live meaningfully and in a way which is authentic to yourself (...who else, silly!?) 
                        <br/>
                        <br/>
                        Anyhoot, it's certainly incomplete - but that's cool, cause so are u!

                        </Text>
                    </Container>
                </Card>
                <Card className={cx(styles.section, styles.linksSection)}>
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
                                    text="What's new?!"
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