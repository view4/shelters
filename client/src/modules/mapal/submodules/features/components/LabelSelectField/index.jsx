import { useMemo, useState } from "react";
import Container from 'modules/Core/components/ui-kit/Container';
import AsyncSelect from 'modules/Core/components/ui-kit/Input/AsyncSelect';
import Card from "modules/Core/components/ui-kit/Card";
import Title from "modules/Core/components/ui-kit/Title";
import { Close } from "modules/Core/components/ui-kit/indicators";
import { InputLabel } from "modules/Core/components/ui-kit/Input";
import Input from "modules/Core/components/ui-kit/Input";
import Button from "modules/Core/components/ui-kit/Button";
import { useIsOpen } from "modules/Core/hooks/useIsOpen";
import styles from "./styles.module.scss";

const query = `
    query boothLabels($boothId: String!) {
        boothLabels(boothId: $boothId) {
            id
            labelId
            label {
                id
                name
                user
                createdAt
                updatedAt
            }
        }
    }
`;

const HeaderComponent = ({ name, unset, id }) => (
    <Container maxWidth spaceBetween flex alignCenter className={styles.header}>
        <Container maxWidth>
            <Title>{name}</Title>
        </Container>
        <Container flex alignCenter>
            <Close onClick={unset} />
        </Container>
    </Container>
)

const Value = ({ value, onChange }) => {
    const headerProps = useMemo(() => value && {
        name: value?.name, id: value?.id, unset: () => onChange(null)
    }, [value, onChange])
    return (
        <>
            <InputLabel label="Selected Label" />
            <Card
                maxWidth
                lightShadow
                maxHeight
                HeaderComponent={HeaderComponent}
                headerProps={headerProps}
                className={styles.valueContainer}
            >
            </Card>
        </>
    )
}

const CreateNewLabel = ({ onSelect, onCancel }) => {
    const [labelName, setLabelName] = useState('');
    
    const handleCreate = () => {
        if (labelName.trim()) {
            onSelect({ name: labelName.trim(), isNew: true });
        }
    };

    return (
        <Container flex col gap1 p1>
            <InputLabel label="Create New Label" />
            <Input
                value={labelName}
                onChange={(value) => setLabelName(value)}
                placeholder="Enter label name"
                onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
            />
            <Container flex gap1>
                <Button onClick={handleCreate} disabled={!labelName.trim()}>
                    Create
                </Button>
                <Button onClick={onCancel} nature="secondary">
                    Cancel
                </Button>
            </Container>
        </Container>
    );
};

const Component = ({ value, onChange, boothId, disabled }) => {
    const { isOpen: showCreate, open: openCreate, close: closeCreate } = useIsOpen();
    const variables = useMemo(() => ({ boothId }), [boothId]);

    if (Boolean(value)) return <Value value={value} onChange={onChange} />
    
    if (showCreate) {
        return (
            <CreateNewLabel 
                onSelect={(newLabel) => {
                    onChange(newLabel);
                    closeCreate();
                }}
                onCancel={closeCreate}
            />
        );
    }

    return (
        <Container flex col gap1>
            <AsyncSelect
                searchable
                label="Select Existing Label"
                query={query}
                parseResult={(res) => {
                    // Get unique labels from boothLabels
                    const uniqueLabels = new Map();
                    res?.boothLabels?.forEach(featureLabel => {
                        const label = featureLabel.label;
                        if (label && !uniqueLabels.has(label.id)) {
                            uniqueLabels.set(label.id, {
                                key: label.id,
                                readable: label.name,
                                id: label.id,
                                name: label.name
                            });
                        }
                    });
                    return Array.from(uniqueLabels.values());
                }}
                variables={variables}
                value={value}
                onChange={(val) => onChange(val)}
                className={styles.select}
                placeholder="Select existing label"
                multiple={false}
                disabled={disabled}
            />
            <Container flex center>
                <Button onClick={openCreate} nature="secondary">
                    Create New Label
                </Button>
            </Container>
        </Container>
    )
}

export default Component; 