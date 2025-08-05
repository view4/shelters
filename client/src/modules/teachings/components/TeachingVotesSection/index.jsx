import { useCallback } from "react";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import Modal from "modules/Core/sub-modules/ui-kit/components/Modal";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import Feed from "modules/Core/components/Feed";
import FeatureVoteForm from "modules/mapal/submodules/features/components/FeatureVoteForm/component";
import { useIsOpen } from "modules/Core/hooks/useIsOpen";
import state from "modules/teachings/state";
import feed from "../../state/feed";
import useOnError from "modules/Core/sub-modules/Dialog/hooks/useOnError";
import styles from "./styles.module.scss";

const VoteItem = ({ text, score, id }) => (
    <Container className={styles.voteItem}>
        <Container className={styles.voteContent}>
            <Container className={styles.voteHeader}>
                <Text className={styles.voteAuthor}>you</Text>
                <Container className={styles.voteScore}>
                    <Text className={styles.voteScoreText}>+{score}</Text>
                </Container>
            </Container>
            <Text className={styles.voteText}>{text}</Text>
        </Container>
    </Container>
);


const VoteInputComponent = ({ teachingId, buttonChildren, buttonProps, upsertVote, refetch }) => {
    const { isOpen, open, close } = useIsOpen();
    const onError = useOnError();

    const handleSubmit = useCallback((formData) => {
        if (formData.text?.trim() && formData.score) {
            upsertVote({
                input: {
                    directiveId: teachingId,
                    text: formData.text,
                    score: formData.score
                },
                callback: (res) => {
                    if (!res?.id) return onError("Failed to add vote");
                    refetch({ renewStream: true });
                    close();
                }
            });
        }
    }, [upsertVote, teachingId, refetch, onError, close]);

    return (
        <>
            <Button onClick={open} {...buttonProps}>
                {buttonChildren}
            </Button>
            <FeatureVoteForm
                isOpen={isOpen}
                onClose={close}
                onSubmit={handleSubmit}
            />
        </>
    );
};

// Vote Input Component - custom wrapper for voting functionality
const VoteInput = strappedConnected(
    VoteInputComponent,
    {},
    {
        upsertVote: state.upsertVote.action,
        refetch: feed.cells.fetchFeed.action
    }
);


const TeachingVotesSection = ({ teachingId, votes, className }) => {
    const { isOpen: votesModalOpen, open: openVotesModal, close: closeVotesModal } = useIsOpen();
    const votesCount = votes?.length || 0;
    const totalScore = votes?.reduce((sum, vote) => sum + (vote.score || 0), 0) || 0;

    return (
        <Container className={`${styles.votesSection} ${className || ''}`}>
            <Container className={styles.votesHeader}>
                <Button
                    className={styles.countButton}
                    onClick={votesCount > 0 ? openVotesModal : undefined}
                    disabled={votesCount === 0}
                >
                    <Text className={styles.countText}>
                        {votesCount} vote{votesCount !== 1 ? 's' : ''} (+{totalScore})
                    </Text>
                </Button>
                <VoteInput
                    teachingId={teachingId}
                    buttonChildren={<span className={styles.actionIcon}>👍</span>}
                    buttonProps={{
                        className: styles.actionButton,
                        title: "Add vote"
                    }}
                />
            </Container>

            {/* Votes Modal */}
            <Modal
                isOpen={votesModalOpen}
                onClose={closeVotesModal}
                bodyClassName={styles.votesModal}
            >
                <Title>Votes ({votesCount}) - Total Score: +{totalScore}</Title>
                <Container className={styles.votesModalList}>
                    <Feed.Component
                        feed={votes}
                        ItemComponent={VoteItem}
                    />
                </Container>
            </Modal>
        </Container>
    );
};

export default TeachingVotesSection;