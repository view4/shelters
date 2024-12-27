import { useCallback, useState } from "react";
import Button from "modules/Core/components/ui-kit/Button";
import ExpandableCard, { ExpandableCardComponent } from "modules/Core/components/ui-kit/Card/ExpandableCard";
import Container from "modules/Core/components/ui-kit/Container";
import Input, { InputLabel } from "modules/Core/components/ui-kit/Input";
import { useIsOpen } from "modules/Core/hooks/useIsOpen";
import Title from "../../ui-kit/Title";
import ConditionalContainer from "../../ui-kit/ConditionalContainer";
import styles from './styles.module.scss';
import ValuesSelectionModal from "./ValuesSelectionModal";

const ValuesField = ({ label, onChange, value = [], ...props }) => {
    const [customValue, setCustomValue] = useState(null);
    const { isOpen, open, close, toggle } = useIsOpen();
    const { isOpen: isModalOpen, open: openModal, close: closeModal } = useIsOpen();

    const handleSelect = useCallback((v) => {
        onChange([
            ...(value ?? []),
            v
        ])
    }, [value, onChange]);

    const onSelect = useCallback((selectedValues) => {
        const selectedValueIds = selectedValues.map(v => v?.id);
        const existingValueIds = value.map(v => v?.id);
        const filteredSelectedValues = selectedValues.filter(v => !existingValueIds.includes(v?.id));
        const filteredValues = value.filter(v => (!v.id || selectedValueIds.includes(v?.id)));
        onChange([
            ...filteredValues,
            ...filteredSelectedValues
        ]);
        closeModal();
    }, [value, onChange]);

    const onAddCustomValue = useCallback(() => {
        handleSelect({ text: customValue })
        setCustomValue('')
        close();
    }, [customValue]);

    return (
        <>
            <InputLabel label={label} />
            <ExpandableCardComponent
                size='md'
                label={'Select from P4P Values'}
                toggleButtonClassName={styles.toggleButton}
                openClassName={styles.open}
                className={styles.customValueCard}
                children={true}
                toggle={openModal}
            />

            <ExpandableCardComponent
                isOpen={isOpen}
                size='md'
                title={'Add Custom Value'}
                toggle={toggle}
                toggleButtonClassName={styles.toggleButton}
                openClassName={styles.open}
                className={styles.customValueCard}
            >
                <Container flex col maxWidth p1 spaceAround maxHeight alignEnd>
                    <Input maxWidth onChange={setCustomValue} value={customValue} />
                    <Button onClick={onAddCustomValue}>Add Value</Button>
                </Container>
            </ExpandableCardComponent>
            <ConditionalContainer shouldRender={Boolean(value?.length)}>
                <Title Element='h4' text={'Selected Values:'} />
                {value?.map((v, i) => (
                    <ExpandableCard key={i} title={v?.text} />
                ))}
            </ConditionalContainer>
            <ValuesSelectionModal onSelect={onSelect} isOpen={isModalOpen} close={closeModal} />
        </>
    )
}


export default ValuesField;