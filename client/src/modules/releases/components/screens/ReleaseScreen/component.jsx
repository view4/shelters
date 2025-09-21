import cx from "classnames"
import { Button, Card, Container, Feature, Screen, Text, Title, Modal, Drawer } from "modules/Core/sub-modules/ui-kit/exports"
import ShelterImage from "modules/shelter/assets/shelter.png";
import SpeciesImage from "modules/releases/assets/four-species.png"
import Etrog from "modules/releases/assets/etrog.png"
import Lulav from "modules/releases/assets/lulav.png"
import Myrtle from "modules/releases/assets/myrtle.png"
import Willow from "modules/releases/assets/willow.png"
import { useState } from "react";
import styles from "./styles.module.scss"
/*

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

const ReleaseScreen = ({ title, releaseDate, features, links, narrative, hasError, releaseKey }) => {
    const [isUpcomingDrawerOpen, setIsUpcomingDrawerOpen] = useState(false);
    const [activeFeature, setActiveFeature] = useState(null);

    // Fixed decorative placements near corners
    const decorations = [
        { src: Etrog, alt: "Etrog", style: { top: "18%", left: "18%", width: "7rem", transform: "rotate(-8deg)", animationDuration: "9s" } },
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
                        <Title>{title}</Title>
                        <Text className={styles.date}>{releaseDate}</Text>
                        <Text className={styles.subText}> A digital space dedicated to improving your with Life.</Text>
                        {/* confirm / verify / judge on usage of 'Life' here... */}
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
                    {/* <Title>Tools to cultivate your growth</Title> */}

                    <Container className={styles.featuresContent}>
                        <Title className={styles.featuresTitle}>Tools to cultivate your growth</Title>
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
                        <Title>Release Notes:</Title>
                        <Text className={styles.narrativeText}>{narrative}</Text>
                    </Container>
                </Card>
                <Card className={cx(styles.section, styles.linksSection)}>
                    <Container className={styles.linksContainer}>
                        <Container className={styles.welcomeTextContainer}>

                            <Container className={styles.intentionContainer}>
                                <Container className={styles.intentionBox}>
                                    <Text className={styles.intentionText}>
                                        Feel free to explore this space, the tools created and to enjoy doing so 
                                         ❤️ ❤️
                                        {/* You are welcome to join the journey and explore the space which has been created so far, with the relevant tools and enjoy doing so. Feedback is appreciated, and even though this place is incomplete, I hope you still find it meaningful ❤️ ❤️  */}
                                    </Text>
                                </Container>
                            </Container>
                        </Container>


                        <Container className={styles.buttonsContainer}>
                            <Button
                                className={cx(styles.funkyButton, styles.funkyButton1)}
                                text="Create an account"
                                to="/register"
                            />
                            <Button
                                className={cx(styles.funkyButton, styles.funkyButton2)}
                                text="See Landing Page"
                                to="/shelter"
                            />
                            <Button
                                className={cx(styles.funkyButton, styles.upcomingButton)}
                                text="View what's coming next"
                                onClick={() => setIsUpcomingDrawerOpen(true)}
                            />
                            <Button
                                className={cx(styles.funkyButton, styles.funkyButton3)}
                                text="Leave some feedback"
                                to="/releases/feedback"
                            />
                        </Container>
                    </Container>
                </Card>

                <Drawer
                    isOpen={isUpcomingDrawerOpen}
                    close={() => setIsUpcomingDrawerOpen(false)}
                    header="What's Coming Next"
                    origin="bottom"
                    size="lg"
                >
                    <Container className={styles.upcomingContent}>
                        <Title level={3}>Upcoming Features & Improvements</Title>
                        <Container className={styles.upcomingList}>
                            <Card className={styles.upcomingItem}>
                                <Title level={4}>Enhanced Analytics Dashboard</Title>
                                <Text>Get deeper insights into your growth patterns with advanced analytics and personalized recommendations.</Text>
                                <Text className={styles.upcomingDate}>Coming in December 2025</Text>
                            </Card>
                            <Card className={styles.upcomingItem}>
                                <Title level={4}>Collaborative Spaces</Title>
                                <Text>Connect with others on similar journeys and create shared goals and accountability partnerships.</Text>
                                <Text className={styles.upcomingDate}>Coming in January 2026</Text>
                            </Card>
                            <Card className={styles.upcomingItem}>
                                <Title level={4}>Mobile App Release</Title>
                                <Text>Take your growth tools on the go with our native mobile application for iOS and Android.</Text>
                                <Text className={styles.upcomingDate}>Coming in February 2026</Text>
                            </Card>
                        </Container>
                    </Container>
                </Drawer>
                <Drawer
                    isOpen={!!activeFeature}
                    close={() => setActiveFeature(null)}
                    header={activeFeature?.name || 'Feature'}
                    origin="bottom"
                    size="md"
                >
                    <Container className={styles.featureDrawerContent}>
                        {activeFeature?.description ? (
                            <Text>{activeFeature.description}</Text>
                        ) : (
                            <Text>No description yet. More details coming soon.</Text>
                        )}
                    </Container>
                </Drawer>
            </Container>
        </Screen>
    )
}

export default ReleaseScreen