import { useMemo } from "react";
import cx from "classnames";
import Container from "modules/Core/components/ui-kit/Container";
import Text from "modules/Core/components/ui-kit/Text";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import ExpandableFeedItem from "modules/Core/components/Feed/ExpandableFeedItem";
import feed from "modules/entries/state/feed";
import ExpandableOptions from "modules/Core/components/ui-kit/ExpandableOptions";
import EditEntryButton from "../EditEntryButton";
import styles from "./styles.module.scss";
import Stamp from "modules/Core/components/ui-kit/Stamp";

const FeedItem = ({ name, text, id, createdAt }) => (
    <ExpandableFeedItem
        name={name ?? "titleless"}
        className={cx(styles.itemContainer, { [styles.titleless]: !name })}
        headerProps={{
            children:
                <Container flex flexEnd>
                    <Stamp timestamp={createdAt} />
                </Container>,
        }}
    >
        <ExpandableOptions
            horizontal
            options={[
                { Component: EditEntryButton, props: { entryId: id } },
            ]} />
        <Text>
            {text}
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