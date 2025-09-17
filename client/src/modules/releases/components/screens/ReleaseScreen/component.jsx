import cx from "classnames"
import { Button, Card, Container, Feature, Screen, Text, Title, Modal, Drawer } from "modules/Core/sub-modules/ui-kit/exports"
import ShelterImage from "modules/shelter/assets/shelter.png";
import SpeciesImage from "modules/releases/assets/four-species.png"
import { useState } from "react";
import styles from "./styles.module.scss"

const ReleaseScreen = ({ title, releaseDate, features, links, narrative, hasError, releaseKey }) => {
    const [isUpcomingDrawerOpen, setIsUpcomingDrawerOpen] = useState(false);
    
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
                        <Title>Tools to cultivate your growth</Title>
                        <Container className={styles.featuresImageContainer}>
                            <img src={SpeciesImage} className={styles.featuresImage} />
                        </Container>
                    </Container>
                    <Container className={styles.featuresContainer}>
                        {features.map((feature, index) => (
                            <Card key={index} className={styles.featureContainer}>
                                <Feature name={feature.name} content={null} />
                            </Card>
                        ))}
                    </Container>

                </Card>
                <Card className={cx(styles.section, styles.narrativeSection)}>
                    <Container className={styles.narrativeContainer}>
                        <Container className={styles.narrativeDoodle1}></Container>
                        <Container className={styles.narrativeDoodle2}></Container>
                        <Container className={styles.narrativeDoodle3}></Container>
                        <Text className={styles.narrativeText}>{narrative}</Text>
                    </Container>
                </Card>
                <Card className={cx(styles.section, styles.linksSection)}>
                    <Container className={styles.linksContainer}>
                        <Container className={styles.welcomeTextContainer}>
                            <Title className={styles.welcomeTitle}>You are welcome to explore, to play, to partake</Title>
                            <Text className={styles.welcomeSubtext}>Choose your path and begin your journey of growth</Text>
                        </Container>
                        
                        <Container className={styles.buttonsContainer}>
                            {links.map((link, index) => (
                                <Button key={index} className={cx(styles.funkyButton, styles[`funkyButton${index + 1}`])} text={link.text} to={link.url} />
                            ))}
                            <Button 
                                className={cx(styles.funkyButton, styles.upcomingButton)} 
                                text="View what's coming next" 
                                onClick={() => setIsUpcomingDrawerOpen(true)} 
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
            </Container>
        </Screen>
    )
}

export default ReleaseScreen