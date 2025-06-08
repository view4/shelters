import React, { useMemo } from "react";
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

const Component = ({ feature, currentStamp }) => {
    if (!feature) return null;

    console.log(feature);
    console.log(JSON.stringify(currentStamp, null, 2));
    return (
        <BoothScreen>
            <Container className={styles.container}>
                <Card relative className={styles.headerCard}
                >
                    <Title>{feature.name}</Title>
                    <Text>{feature.text}</Text>
                    <Container flex row spaceBetween absolute maxWidth bottom alignCenter>
                        {currentStamp && (
                            <Stamp
                                stamp={currentStamp.key}
                                timestamp={currentStamp.value}
                            />
                        )}
                        <Container flex row gap1>

                            <StampFeatureButton
                                id={feature.id}
                                currentStamp={currentStamp}
                            />
                            <FeatureFormButton
                                initialValues={{
                                    name: feature.name,
                                    text: feature.text
                                }}
                                id={feature.id}
                            />
                        </Container>

                    </Container>
                </Card>

                <Container flex col maxHeight maxWidth className={styles.content}>
                    <IntrospectionCard
                        actions={[{ Component: FeatureVoteButton, featureId: feature.id }]}
                        title="Votes"
                    >
                        {feature.votes?.length ? (
                            feature.votes.map(vote => (
                                <Container
                                    key={vote.id}
                                    className={cx(
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
                        ) : (
                            <Text>No votes yet</Text>
                        )}
                    </IntrospectionCard>

                    <IntrospectionCard
                        title="Comments"
                        actions={[{ Component: FeatureCommentInput, className: styles.commentInput, featureId: feature.id }]}
                    >
                        {feature.comments?.length ? (
                            feature.comments.map(comment => (
                                <Container key={comment.id} bg1 flex row spaceBetween p1 className={styles.item}>
                                    <Text>{comment.text}</Text>
                                    <Stamp timestamp={comment.createdAt} formatter={formatter} />
                                </Container>
                            ))
                        ) : (
                            <Text>No comments yet</Text>
                        )}
                    </IntrospectionCard>
                </Container>
            </Container>
        </BoothScreen>
    );
};

export default strappedConnected(
    Component,
    {
        feature: (state, { id }) => feed.cells.fetchEntity.selector(id)(state)
    },
    {
        fetchFeature: feed.cells.fetchEntity.action
    },
    ({ id, fetchFeature, feature }) => {
        useOnLoad(() => {
            fetchFeature({ id });
        }, id && !feature?.id, [id]);
        return {
            id,
            currentStamp: useMemo(() => feature?.currentStamp, [feature])
        }
    }
); 