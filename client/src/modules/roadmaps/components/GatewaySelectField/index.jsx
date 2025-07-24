import { useMemo } from "react";
import Container from 'modules/Core/sub-modules/ui-kit/components/Container';
import AsyncSelect from 'modules/Core/sub-modules/ui-kit/components/Input/AsyncSelect';
import Card from "modules/Core/sub-modules/ui-kit/components/Card";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import { Close } from "modules/Core/sub-modules/ui-kit/components/indicators";
import { InputLabel } from "modules/Core/sub-modules/ui-kit/components/Input";
import styles from "./styles.module.scss";

const query = `
    query gateways($search: String, $boothId: String, $isCycleless: Boolean) {
        gateways(search: $search, boothId: $boothId, isCycleless: $isCycleless, feedParams: {segment: [0, 10]}) {
            entities {
                name
                id
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
            <InputLabel label="Parent Gateway" />
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

const Component = ({ value, onChange, boothId, disabled, }) => {
    const variables = useMemo(() => ({ boothId, isCycleless: true }), [boothId]);

    if (Boolean(value)) return <Value value={value} onChange={onChange} />
    return (
        <Container>
            <AsyncSelect
                searchable
                label="Parent Gateway"
                query={query}
                parseResult={(res) => res?.gateways.entities.map(({ name, id }) => ({
                    key: id,
                    readable: name,
                    id,
                    name
                }))}
                variables={variables}
                value={value}
                onChange={(val) => onChange(val)}
                className={styles.parent}
                placeholder="Select Parent Gateway"
                multiple={false}
                disabled={value?.disabled}
            />
        </Container>
    )
}

export default Component