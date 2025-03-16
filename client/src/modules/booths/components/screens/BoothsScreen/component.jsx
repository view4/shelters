import feed from "modules/booths/state/feed"
import Container from "modules/Core/components/ui-kit/Container"
import RedirectButton from "modules/Core/components/ui-kit/RedirectButton"
import StampedFeedItem from "modules/Core/components/Feed/StampedFeedItem"
import Screen from "modules/shelter/components/Screen"
import styles from "./styles.module.scss"

const Feed = feed.FeedComponent;

export default ({ ...props }) => (
    <Screen
        header="Booths"
        footerProps={{
            className: styles.footer
        }}
        footer={
            <Container className={styles.headerChildren}>
                <RedirectButton text="Create Booth" to="/create" />
            </Container>
        }
    >
        <Feed {...props} ItemComponent={StampedFeedItem} />
    </Screen>
)