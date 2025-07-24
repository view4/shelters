import React from "react";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Tag from "modules/Core/sub-modules/ui-kit/components/Tag";
import feed from "modules/mapal/submodules/features/state/feed";
import state from "modules/mapal/submodules/features/state";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import AddLabelButton from "../AddLabelButton";
import styles from "./styles.module.scss";
import Card from "modules/Core/sub-modules/ui-kit/components/Card";
import { getLabelColor } from "./helpers";

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