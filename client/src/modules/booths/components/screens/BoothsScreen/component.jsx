import { Fragment } from "react"
import feed from "modules/booths/state/feed"
import Container from "modules/Core/sub-modules/ui-kit/components/Container"
import RedirectButton from "modules/Core/sub-modules/ui-kit/components/RedirectButton"
import StampedFeedItem, { FeedItemStamps } from "modules/Core/components/Feed/StampedFeedItem"
import BoothScreen from "modules/shelter/components/BoothScreen"
import Stamp from "modules/Core/sub-modules/ui-kit/components/Stamp"
import styles from "./styles.module.scss"

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
            <Container flex col>
                <Feed {...props} ItemComponent={FeedItem} />
            </Container>
            <Container p3 flex maxWidth center className={styles.headerChildren}>
                <RedirectButton text="Create Booth" to="/create" />
            </Container>
        </Container>
    </BoothScreen>
)