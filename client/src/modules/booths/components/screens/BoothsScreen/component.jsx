import feed from "modules/booths/state/feed"
import Container from "modules/Core/components/ui-kit/Container"
import RedirectButton from "modules/Core/components/ui-kit/RedirectButton"
import Screen from "modules/Core/components/ui-kit/Screen"
import styles from "./styles.module.scss"
import FeedItem from "modules/Core/components/Feed/FeedItem"
import Stamps from "modules/Core/components/ui-kit/Stamps"

const Feed = feed.FeedComponent;

const formatter = (stamps={}) => Object.entries(stamps)?.map(([key, value]) => ({
    text: key,
    timestamp: value
}))
const FeedItemStamps = ({ createdAt, stamps, ...props }) => (
    <Container>
        <Stamps stamps={stamps ?? {}} formatter={formatter} />
    </Container>
)

const StampedFeedItem = ({ stamps, createdAt, ...props }) => (
    <FeedItem
        headerChildren={
            <FeedItemStamps stamps={stamps} createdAt={createdAt} />
        } {...props}
    />
)

export default ({ ...props }) => (
    <Screen
        header="Booths"
        headerChildren={
            <Container className={styles.headerChildren}>
                <RedirectButton text="Create Booth" to="/create" />
            </Container>
        }
        
    >
        <Feed {...props}  ItemComponent={StampedFeedItem} />
    </Screen>
)