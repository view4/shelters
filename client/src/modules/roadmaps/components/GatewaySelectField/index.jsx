import { useMemo } from "react";
import Container from 'modules/Core/components/ui-kit/Container';
import AsyncSelect from 'modules/Core/components/ui-kit/Input/AsyncSelect';
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


const Component = ({ value, onChange, boothId, disabled, ...misc }) => {
    // COULDDO: get functioning without the use of key as an interim field, or key just being ID, yeeeeee...... :) 
    const variables = useMemo(() => ({ boothId, isCycleless: true }), [boothId])
    return (
        <Container>
            <AsyncSelect
                searchable
                label="Parent Gateway"
                query={query}
                parseResult={(res) => res?.gateways.entities.map(({ name, key, id }) => ({
                    key: { name, key, id },
                    readable: name,
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