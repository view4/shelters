import React from "react";
import cx from 'classnames';
import Text from "modules/Core/components/ui-kit/Text";
import Container from "modules/Core/components/ui-kit/Container";
import IntrospectionCard from "modules/booths/components/IntrospectionCard";
import feed from "../../../state/feed";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import { useOnLoad } from "modules/Core/hooks/useOnLoad";
import FeatureVoteButton from "../../FeatureVoteButton";
import FeatureCommentInput from "../../FeatureCommentInput";
import BoothScreen from "modules/shelter/components/BoothScreen";
import Card from "modules/Core/components/ui-kit/Card";
import Title from "modules/Core/components/ui-kit/Title";
import Stamp from "modules/Core/components/ui-kit/Stamp";
import { UpArrow, DownArrow } from 'modules/Core/components/ui-kit/indicators';
import FeatureFormButton from "../../FeatureFormButton";
import StampFeatureButton from "../../StampFeatureButton";
import styles from "./styles.module.scss";

const formatter = (date) => {
    if (!date) return '';
    const d = new window.Date(date);
    return `${String(d.getDate()).padStart(2, '0')}·${String(d.getMonth() + 1).padStart(2, '0')}·${d.getFullYear()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

const StrappedStamp = strappedConnected(Stamp, {
    currentStamp: (state, { featureId }) => feed.cells.fetchEntity.selectField(featureId, "currentStamp")(state)
}, {
}, ({ featureId, fetchFeature, feature, currentStamp }) => {
    return {
        stamp: currentStamp?.key,
        timestamp: currentStamp?.value,
    }
})

const VotesCard = strappedConnected(IntrospectionCard,
    {
        votes: (state, { featureId }) => feed.cells.fetchEntity.selectField(featureId, "votes")(state)
    },
    {
        // fetchFeature: feed.cells.fetchEntity.action
    },
    ({ featureId, votes }) => {
        return {
            title: "Votes",
            actions: [{ Component: FeatureVoteButton, featureId }],
            children: votes?.length ? (
                votes.map(vote => (
                    <Container key={vote.id} className={cx(
                        styles.item,
                        styles.voteItem,
                        { [styles.upvote]: vote.score === 1 },
                        { [styles.downvote]: vote.score === -1 }
                    )}
                    >
                        <Container flex row spaceBetween alignCenter>
                            <Container flex alignCenter gap1>
                                <Container>
                                    {vote.score === 1 ? <UpArrow /> : <DownArrow />}
                                </Container>
                                <Text>{vote.text}</Text>
                            </Container>
                            <Container flex alignCenter gap1>
                                <Stamp timestamp={vote.createdAt} formatter={formatter} />
                            </Container>
                        </Container>
                    </Container>
                ))
            ) : <Text>No votes yet</Text>,
        }
    })

const CommentsCard = strappedConnected(IntrospectionCard, {
    comments: (state, { featureId }) => feed.cells.fetchEntity.selectField(featureId, "comments")(state)
}, {
},
    ({ featureId, comments }) => {
        return {
            title: "Comments",
            actions: [{ Component: FeatureCommentInput, className: styles.commentInput, featureId }],
            children: comments?.length ? (
                comments.map(comment => (
                    <Container key={comment.id} bg1 flex lightShadow row spaceBetween p1>
                    
                        <Text>{comment.text}</Text>
                        <Stamp timestamp={comment.createdAt} formatter={formatter} />
                    </Container>
                ))
            ) : <Text>No comments yet</Text>,
        }
    })

const Component = ({ boothId, name, text, feature, currentStamp, id }) => {
    if (!boothId) return null;

    console.log(feature);
    console.log(JSON.stringify(currentStamp, null, 2));
    return (
        <BoothScreen boothId={boothId}>
            <Container className={styles.container}>
                <Card relative className={styles.headerCard}
                >
                    <Title>{name}</Title>
                    <Text>{text}</Text>
                    <Container flex row spaceBetween absolute maxWidth bottom alignCenter>
                        {/* {currentStamp && ( */}
                        <StrappedStamp
                            featureId={id}
                        />
                        {/* )} */}
                        <Container flex row gap1>

                            <StampFeatureButton
                                featureId={id}
                            />
                            <FeatureFormButton
                                initialValues={{
                                    name,
                                    text
                                }}
                                id={id}
                            />
                        </Container>

                    </Container>
                </Card>

                <Container flex col maxHeight maxWidth className={styles.content}>
                    <VotesCard featureId={id} />
                    <CommentsCard featureId={id} />
                </Container>
            </Container>
        </BoothScreen>
    );
};

export default strappedConnected(
    Component,
    {
        boothId: (state, { id }) => feed.cells.fetchEntity.selectField(id, "boothId")(state),
        name: (state, { id }) => feed.cells.fetchEntity.selectField(id, "name")(state),
        text: (state, { id }) => feed.cells.fetchEntity.selectField(id, "text")(state),
    },
    {
        fetchFeature: feed.cells.fetchEntity.action
    },
    ({ id, fetchFeature, feature, }) => {
        useOnLoad(() => {
            fetchFeature({ id });
        }, id && !feature?.id, [id]);
    }
); 