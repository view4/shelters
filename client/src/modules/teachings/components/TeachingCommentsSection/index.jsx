import { useCallback, useState } from "react";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import Modal from "modules/Core/sub-modules/ui-kit/components/Modal";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import Feed from "modules/Core/components/Feed";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import FeatureCommentInput from "modules/mapal/submodules/features/components/FeatureCommentInput/component";
import { useIsOpen } from "modules/Core/hooks/useIsOpen";
import state from "modules/teachings/state";
import feed from "../../state/feed";
import useOnError from "modules/Core/sub-modules/Dialog/hooks/useOnError";
import styles from "./styles.module.scss";
import { Header } from "modules/Core/sub-modules/ui-kit/exports";

const CommentItem = ({ text, id }) => (
    <Container lightShadow className={styles.commentItem}>
        <Text>
            <span className={styles.commentAuthor}>you</span> {text}
        </Text>
    </Container>
);

// Comment Input Component
const CommentInput = strappedConnected(
    FeatureCommentInput,
    {},
    {
        upsertComment: state.upsertComment.action,
        refetch: feed.cells.fetchFeed.action
    },
    ({ upsertComment, teachingId, refetch, onClose, buttonChildren, buttonProps }) => {
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
                        close();
                        onClose?.();
                    }
                });
                setText("");
            }
        }, [upsertComment, teachingId, refetch, text, onError, close, onClose]);

        const handleCancel = useCallback(() => {
            setText("");
            close();
            onClose?.();
        }, [close, onClose]);

        return {
            isOpen,
            open,
            text,
            onTextChange: setText,
            onSubmit: handleSubmit,
            cancel: handleCancel,
            buttonChildren,
            buttonProps
        };
    }
)

const TeachingCommentsSection = ({ teachingId, comments, className }) => {
    const { isOpen: commentsModalOpen, open: openCommentsModal, close: closeCommentsModal } = useIsOpen();
    const commentsCount = comments?.length || 0;

    return (
        <Container className={`${styles.commentsSection} ${className || ''}`}>
            <Container className={styles.commentsHeader}>
                <Button
                    className={styles.countButton}
                    onClick={commentsCount > 0 ? openCommentsModal : undefined}
                    disabled={commentsCount === 0}
                >
                    <Text className={styles.countText}>
                        {commentsCount} comment{commentsCount !== 1 ? 's' : ''}
                    </Text>
                </Button>
                <CommentInput
                    teachingId={teachingId}
                    buttonChildren={<span className={styles.actionIcon}>💬</span>}
                    buttonProps={{
                        className: styles.actionButton,
                        title: "Add comment"
                    }}
                />
            </Container>

            {/* Comments Modal */}
            <Modal
                isOpen={commentsModalOpen}
                onClose={closeCommentsModal}
                bodyClassName={styles.commentsModal}
            >
                <Header 
                    title={`Comments (${commentsCount})`}  
                    className={styles.commentsModalHeader}
                />
                <Container className={styles.commentsModalList}>
                    <Feed.Component
                        feed={comments}
                        ItemComponent={CommentItem}
                    />
                    <Container flex center lightShadow className={styles.commentsModalFooter}>
                        <CommentInput
                            teachingId={teachingId}
                            buttonChildren={"+"}
                            buttonProps={{
                                className: styles.actionButton,
                                title: "Add comment"
                            }}
                        />
                    </Container>
                </Container>
            </Modal>
        </Container>
    );
};

export default TeachingCommentsSection;