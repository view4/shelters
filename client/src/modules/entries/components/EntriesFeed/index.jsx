import { useMemo } from "react";
import cx from "classnames";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import ExpandableFeedItem from "modules/Core/components/Feed/ExpandableFeedItem";
import feed from "modules/entries/state/feed";
import ExpandableOptions from "modules/Core/sub-modules/ui-kit/components/ExpandableOptions";
import EditEntryButton from "../EditEntryButton";
import styles from "./styles.module.scss";
import Stamp from "modules/Core/sub-modules/ui-kit/components/Stamp";

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
        size={text?.length > 360 ? "xlg" : text?.length < 180 ?"md" : "lg"}
    >
        <ExpandableOptions
            horizontal
            tridot
            optionsOrigin="right"
            options={[
                { Component: EditEntryButton, props: { entryId: id } },
                { text: "View", props: { to: `/entries/${id}` } },
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