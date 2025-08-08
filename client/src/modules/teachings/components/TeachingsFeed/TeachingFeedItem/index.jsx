import cx from "classnames";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";
import ExpandableFeedItem from "modules/Core/components/Feed/ExpandableFeedItem";
import TeachingCommentsSection from "../../TeachingCommentsSection";
import TeachingVotesSection from "../../TeachingVotesSection";
import { Card, ExpandableOptions, Title } from "modules/Core/sub-modules/ui-kit/exports";
import TeachingFormButton from "../../TeachingFormButton";
import EditTeachingButton from "../../TeachingFormButton/EditTeachingButton";
import withFocusedBoothId from "modules/booths/higher-order-components/withFocusedBoothId";
import styles from "./styles.module.scss";

const TeachingExpandableOptions = ({ id }) => (
    <ExpandableOptions
        horizontal
        options={[
            { Component: withFocusedBoothId(EditTeachingButton), props: { id, text: "edit" } },
            { Component: withFocusedBoothId(TeachingFormButton), props: { parentId: id, text: "add subteaching" } },
        ]}
    />
);

const SubteachingCard = ({ name, text, id, comments, votes }) => (
    <Card lightShadow className={styles.subteachingContainer} p1>
        <Container>
            <Title>{name}</Title>
            <Text>{text}</Text>
        </Container>
        <Container>
            <Container display flex flexEnd>
                {/* Comments */}
                <Container className={styles.interactionGroup}>
                    <TeachingCommentsSection
                        teachingId={id}
                        comments={comments}
                    />
                </Container>
                {/* Votes */}
                <Container className={styles.interactionGroup}>
                    <TeachingVotesSection
                        teachingId={id}
                        votes={votes}
                    />
                </Container>
            </Container>
        </Container>
    </Card>
)

// COULD DO: Enable Edit here  
export default ({ name, text, id, comments, votes, children }) => {
    return (
        <ExpandableFeedItem
            name={name}
            className={cx(styles.container, { [styles.titleless]: !name })}
            size={text?.length > 360 ? "xlg" : text?.length < 180 ? "md" : "lg"}
        >
            <Container className={styles.innerHeader} display flex spaceBetween>
                <Container  >
                    {/* Comments */}
                    <Container className={styles.interactionGroup}>
                        <TeachingCommentsSection
                            teachingId={id}
                            comments={comments}
                        />
                    </Container>
                    {/* Votes */}
                    <Container className={styles.interactionGroup}>
                        <TeachingVotesSection
                            teachingId={id}
                            votes={votes}
                        />
                    </Container>
                </Container>
                <TeachingExpandableOptions id={id} />
            </Container>
            <Text>{text}</Text>
            <Container className={styles.subteachingsContainer}>
                <Title>subteachings</Title>
                {(children).map((child) => (
                    <SubteachingCard key={child.id} {...child} />
                ))}
            </Container>
        </ExpandableFeedItem>
    );
};
