import React, { useState } from "react";
import { useCallback, useMemo } from "react";
import Modal from "modules/Core/components/ui-kit/Modal";
import Button from "modules/Core/components/ui-kit/Button";
import state from "modules/mapal/submodules/features/state";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import Input from "modules/Core/components/ui-kit/Input";
import feed from "modules/mapal/submodules/features/state/feed";
import Container from "modules/Core/components/ui-kit/Container";
import { useOnLoad } from "modules/Core/hooks/useOnLoad";
import Text from "modules/Core/components/ui-kit/Text";
import Tag from "modules/Core/components/ui-kit/Tag";
import { getLabelColor } from "../LabelsCard";
import cx from "classnames";
import styles from "./styles.module.scss";
import { compactObject } from "modules/Core/utils/obj";

const AddLabelModal = strappedConnected(Modal,
    {
        labels: state.fetchBoothLabels?.selector,
        boothId: (state, { featureId }) => feed.cells.fetchEntity.selectField(featureId, "boothId")(state),
        existingLabels: (state, { featureId }) => feed.cells.fetchEntity.selectField(featureId, "labels")(state)
    },
    {
        fetchBoothLabels: state.fetchBoothLabels?.action,
        onCreate: state.addFeatureLabel?.action,
        refetchFeature: feed.cells.fetchEntity.action
    },
    ({ isOpen, onClose, refetchFeature, existingLabels, fetchBoothLabels, boothId, labels = [], onCreate, featureId }) => {
        const [input, setInput] = useState('');
        const [selectedLabel, setSelectedLabel] = useState(null);

        const filteredLabels = useMemo(() => {
            if (!input.trim()) return labels;
            return labels.filter(label =>
                label.name.toLowerCase().includes(input.toLowerCase())
            );
        }, [labels, input]);
        useOnLoad(() => {
            fetchBoothLabels({ boothId });
        }, [boothId]);

        const toggleSelectedLabel = useCallback((label) => {
            return setSelectedLabel(selectedLabel?.id === label.id ? null : label);
        }, [selectedLabel]);

        const handleCreateLabel = useCallback(({ labelId, name }) => {
            onCreate({
                input: compactObject({
                    featureId,
                    labelId,
                    name
                }),
                callback: () => {
                    setInput('');
                    setSelectedLabel(null);
                    onClose();
                    refetchFeature({ id: featureId });
                }
            });
        }, [onCreate, featureId, onClose, refetchFeature]);


        return {
            isOpen,
            onClose,
            title: "Add Label",
            children: (
                <Container flex col maxWidth className={styles.container}>
                    <Container maxWidth className={styles.inputContainer}>
                        <Input
                            value={input}
                            onChange={setInput}
                            placeholder="Enter label name"
                        />
                    </Container>
                    <Container className={styles.labelsContainer}>
                        {filteredLabels?.length ? filteredLabels.map(label => (
                            <Tag
                                key={label.id}
                                text={label.name}
                                nature={getLabelColor(label.name)}
                                size="sm"
                                onClick={() => toggleSelectedLabel(label)}
                                className={cx(styles.labelTag, selectedLabel?.id === label.id && styles.selected)}
                            />
                        )) : <Text>No labels found</Text>}
                    </Container>
                    <Container flex flexEnd className={styles.footer}>
                        {selectedLabel?.id && <Button text="Add Label" onClick={() => handleCreateLabel(selectedLabel)} />}
                        {!selectedLabel?.id && filteredLabels?.length === 0 && input.trim() && <Button text="Create New Label" onClick={() => handleCreateLabel({ id: null, name: input })} />}
                    </Container>
                </Container>
            )
        }
    }
);

const AddLabelButton = ({ isOpen, onOpen, onClose, featureId, text = "Add Label" }) => {
    return (
        <>
            <Button onClick={onOpen} text={text} />
            <AddLabelModal isOpen={isOpen} onClose={onClose} featureId={featureId} />
        </>
    );
};

export default AddLabelButton; 