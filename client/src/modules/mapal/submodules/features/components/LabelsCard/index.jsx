import React from "react";
import Text from "modules/Core/components/ui-kit/Text";
import Container from "modules/Core/components/ui-kit/Container";
import Tag from "modules/Core/components/ui-kit/Tag";
import feed from "modules/mapal/submodules/features/state/feed";
import state from "modules/mapal/submodules/features/state";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import AddLabelButton from "../AddLabelButton";
import styles from "./styles.module.scss";
import Card from "modules/Core/components/ui-kit/Card";
// Color palette for labels - 12 distinct colors
const LABEL_COLORS = [
    'purple',
    'bordered-ocean-blue',
    'grey',
    'purple',
    'bordered-ocean-blue',
    'grey',
    'purple',
    'bordered-ocean-blue',
    'grey',
    'purple',
    'bordered-ocean-blue',
    'grey'
];

// Function to get consistent color based on label name
export const getLabelColor = (labelName) => {
    if (!labelName) return 'purple';

    // Create a simple hash from the label name to get consistent color
    let hash = 0;
    for (let i = 0; i < labelName.length; i++) {
        const char = labelName.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }

    // Use absolute value and modulo to get index
    const index = Math.abs(hash) % LABEL_COLORS.length;
    return LABEL_COLORS[index];
};

const LabelsCard = strappedConnected(Card,
    {
        labels: (state, { featureId }) => feed.cells.fetchEntity.selectField(featureId, "labels")(state)
    },
    {
        removeFeatureLabel: state.removeFeatureLabel?.action
    },
    ({ featureId, labels, removeFeatureLabel, refetch }) => {
        const handleRemoveLabel = (featureLabelId) => {
            removeFeatureLabel({ featureLabelId, callback: () => refetch(true) });
        };

        return {
            className: styles.labelsCard,
            actions: [{ Component: AddLabelButton, featureId }],
            children:
                <Container flex col center maxWidth gap1>
                    {labels?.length ? labels.map(label => (
                        <Container key={label.id} className={styles.labelItem} flex row spaceBetween alignCenter>
                            <Tag
                                text={label?.name}
                                onDelete={() => handleRemoveLabel(label.id)}
                                nature={getLabelColor(label?.name)}
                                size="sm"
                            />
                        </Container>
                    )) : <Text>No labels</Text>}
                    <AddLabelButton text={"Add label"} featureId={featureId} />
                </Container>
            ,
            flex: true, center: true, justifyCenter: true,
        }
    }
);

export default LabelsCard; 