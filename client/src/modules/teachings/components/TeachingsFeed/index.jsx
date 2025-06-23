import { useCallback, useMemo, useState } from "react";
import cx from "classnames";
import Container from "modules/Core/components/ui-kit/Container";
import Text from "modules/Core/components/ui-kit/Text";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import ExpandableFeedItem from "modules/Core/components/Feed/ExpandableFeedItem";
import feed from "../../state/feed";
import Feed from "modules/Core/components/Feed";
import FeatureCommentInput from "modules/mapal/submodules/features/components/FeatureCommentInput/component";
import { useIsOpen } from "modules/Core/hooks/useIsOpen";
import state from "modules/teachings/state";
import styles from "./styles.module.scss";
import useOnError from "modules/Core/sub-modules/Dialog/hooks/useOnError";

const CommentItem = ({ text, id }) => (
    <Text>
        {text}
    </Text>
);

// COULD DO: Make Comment Input a generic shared component, and then handle wrapping accordingly...
const CommentInput = strappedConnected(
    FeatureCommentInput,
    {},
    {
        upsertComment: state.upsertComment.action,
        refetch: feed.cells.fetchFeed.action
    },
    ({ upsertComment, teachingId, refetch }) => {
        const { isOpen, open, close } = useIsOpen();
        const [text, setText] = useState("");

        const onError = useOnError();


        const handleSubmit = useCallback(() => {
            if (text.trim()) {
                upsertComment({
                    input: {
                        directiveId: teachingId,
                        text
                    },
                    callback: (res) => {
                        if (!res?.id) return onError("Failed to add comment");
                        refetch({ renewStream: true });
                    }
                });
                setText("");
                close();
            }
        }, [upsertComment, teachingId, refetch, text, onError, close]);

        return {
            isOpen,
            text,
            onTextChange: setText,
            onSubmit: handleSubmit,
            cancel: () => {
                setText("");
                close();
            },
            open
        };
    }
)

// COULD DO: Enable Edit here
const FeedItem = ({ name, text, id, currentStamp, comments }) => (
    <ExpandableFeedItem
        name={name}
        className={cx(styles.itemContainer, { [styles.titleless]: !name })}
        size={text?.length > 360 ? "xlg" : text?.length < 180 ? "md" : "lg"}
    >
        <Text>{text}</Text>
        <CommentInput
            teachingId={id}
        />
        <Feed.Component
            feed={comments}
            ItemComponent={CommentItem}
        />
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