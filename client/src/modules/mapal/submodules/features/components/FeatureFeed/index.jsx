import { useMemo } from "react";
import cx from "classnames";
import Container from "modules/Core/components/ui-kit/Container";
import Text from "modules/Core/components/ui-kit/Text";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import ExpandableFeedItem from "modules/Core/components/Feed/ExpandableFeedItem";
import feed from "../../state/feed";
import Button from "modules/Core/components/ui-kit/Button";
import Stamp from "modules/Core/components/ui-kit/Stamp";
import styles from "./styles.module.scss";

export const FeedItem = ({ name, text, id, currentStamp }) => (
    <ExpandableFeedItem
        name={name ?? "titleless"}
        className={cx(styles.itemContainer, { [styles.titleless]: !name })}
        headerProps={{
            children: (
                <Container flex row spaceBetween alignCenter>
                    {currentStamp && (
                        <Stamp 
                            stamp={currentStamp.key} 
                            timestamp={currentStamp.value}
                        />
                    )}
                    <Button to={`/feature/${id}`}>View</Button>
                </Container>
            )
        }}
        size={text?.length > 360 ? "xlg" : text?.length < 180 ? "md" : "lg"}
    >
        <Text>
            {text}
        </Text>
    </ExpandableFeedItem>
);

const Component = (props) => (
    <Container maxWidth justifyCenter>
        <feed.FeedComponent
            ItemComponent={FeedItem}
            {...props} />
    </Container>
);

export default strappedConnected(
    Component,
    {},
    {},
    ({ boothId }) => ({
        filters: useMemo(() => ({ boothId }), [boothId]),
    })
); 