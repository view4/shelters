import feed from "modules/booths/state/feed"
import Container from "modules/Core/components/ui-kit/Container"
import RedirectButton from "modules/Core/components/ui-kit/RedirectButton"
import StampedFeedItem from "modules/Core/components/Feed/StampedFeedItem"
import BoothScreen from "modules/shelter/components/BoothScreen"
import styles from "./styles.module.scss"

const Feed = feed.FeedComponent;

export default ({ ...props }) => (
    <BoothScreen
        header="Booths"
        footerProps={{
            className: styles.footer
        }}
    >
        <Container maxHeight flex col spaceBetween>
            <Feed {...props} ItemComponent={StampedFeedItem} />
            <Container p3 flex maxWidth center className={styles.headerChildren}>
                <RedirectButton text="Create Booth" to="/create" />
            </Container>
        </Container>
    </BoothScreen>
)