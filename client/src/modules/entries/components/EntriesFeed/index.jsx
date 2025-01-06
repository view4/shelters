import { useMemo } from "react";
import Container from "modules/Core/components/ui-kit/Container";
import Text from "modules/Core/components/ui-kit/Text";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import ExpandableFeedItem from "modules/Core/components/Feed/ExpandableFeedItem";
import feed from "modules/entries/state/feed";
import ExpandableOptions from "modules/Core/components/ui-kit/ExpandableOptions";
import EditEntryButton from "../EditEntryButton";
import styles from "./styles.module.scss";

const FeedItem = ({ name, text, id, stamps }) => (
    <ExpandableFeedItem name={name} className={styles.itemContainer}>
        <ExpandableOptions
            horizontal
            options={[
                { Component: EditEntryButton, props: { entryId: id } },
            ]} />
        <Text>
            {text}
        </Text>
        <Text>
            Stamps: {JSON.stringify(stamps)}... handle display time here
        </Text>

    </ExpandableFeedItem>
)

const Component = (props) => (
    <Container maxWidth justifyCenter>
        <feed.FeedComponent
            ItemComponent={FeedItem}
            {...props} />
    </Container>
)


export default strappedConnected(
    Component,
    {},
    {
    },
    ({ boothId }) => ({
        filters: useMemo(() => ({ boothId }), [boothId]),
    })
)