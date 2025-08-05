import { useMemo } from "react";
import cx from "classnames";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";
import ExpandableFeedItem from "modules/Core/components/Feed/ExpandableFeedItem";
import TeachingCommentsSection from "../../TeachingCommentsSection";
import TeachingVotesSection from "../../TeachingVotesSection";
import styles from "./styles.module.scss";
import { ExpandableOptions } from "modules/Core/sub-modules/ui-kit/exports";
import TeachingFormButton from "../../TeachingFormButton";


const TeachingExpandableOptions = () => (
    <ExpandableOptions
        horizontal
        options={[
            { Component: TeachingFormButton, props: { id, text: "Edit Teaching" } },
            { Component: TeachingFormButton, props: { parentId: id, text: "Add Sub-Teaching" } },
        ]}
    />
)
// COULD DO: Enable Edit here  
export default ({ name, text, id, currentStamp, comments, votes }) => {

    return (
        <ExpandableFeedItem
            name={name}
            className={cx(styles.container, { [styles.titleless]: !name })}
            size={text?.length > 360 ? "xlg" : text?.length < 180 ? "md" : "lg"}
        >
            <Text>{text}</Text>

            {/* Interaction Section */}
            <Container className={styles.interactionSection}>
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


        </ExpandableFeedItem>
    );
};
