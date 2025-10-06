import { Fragment } from "react"
import feed from "modules/booths/state/feed"
import Container from "modules/Core/sub-modules/ui-kit/components/Container"
import RedirectButton from "modules/Core/sub-modules/ui-kit/components/RedirectButton"
import StampedFeedItem, { FeedItemStamps } from "modules/Core/components/Feed/StampedFeedItem"
import BoothScreen from "modules/shelter/components/BoothScreen"
import Stamp from "modules/Core/sub-modules/ui-kit/components/Stamp"
import BoothsScreenHeader from "modules/shelter/components/BoothScreen/BoothScreenHeader"
import { BOOTHS } from "../../InfoComponent/lib/keys"
import ShelterImage from "modules/shelter/assets/shelter.png";
import styles from "./styles.module.scss"
import { Card, Text, Title } from "modules/Core/sub-modules/ui-kit/exports"

const Feed = feed.FeedComponent;

export const FeedItem = ({ mapal, stamps, malchut, ...props }) => (
    <StampedFeedItem
        headerChildren={<Container flex row >
            {mapal?.id && <Stamp nature='somewhat_certain' stamp={"Mapal"} />}
            {malchut?.id && <Stamp nature='somewhat_certain' stamp={"Teachings"} />}
            <FeedItemStamps stamps={stamps} />
        </Container>}
        {...props}
    />
)

const EmptyFeedComponent = () => (
    <Container maxHeight maxWidth flex center className={styles.emptyWrapper}>
        <Card className={styles.emptyCard}>
            <Title className={styles.emptyTitle}>No Booths Found</Title>
            <img className={styles.emptyImage} src={ShelterImage} alt="Shelter" />
            <Text className={styles.emptyText}>Create your first booth to get started.</Text>
        </Card>
    </Container>
)

export default ({ ...props }) => (
    <BoothScreen
        tripanel
        header="Booths"
        footerProps={{
            className: styles.footer
        }}
        RightPanelComponent={Fragment}
        className={styles.screen}
    >
        <Container maxHeight flex col spaceBetween maxWidth>
            <BoothsScreenHeader
                header="Booths"
                infoKey={BOOTHS.feed}
            />
            <Container maxHeight flex col spaceBetween maxWidth>
                <Container maxHeight flex col>
                    <Feed
                        {...props}
                        ItemComponent={FeedItem}
                        EmptyComponent={EmptyFeedComponent}
                    />
                </Container>
                <Container p3 flex maxWidth center className={styles.buttonContainer}>
                    <RedirectButton text="Create Booth" to="/create" />
                </Container>
            </Container>
        </Container>
    </BoothScreen>
)