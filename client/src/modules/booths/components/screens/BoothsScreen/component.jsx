import feed from "modules/booths/state/feed"
import Screen from "modules/Core/components/ui-kit/Screen"

const Feed = feed.FeedComponent
export default ({...props}) => (
    <Screen header="Booths">
        <Feed {...props}/>
    </Screen>
)