import cx from "classnames";
import { useEffect } from "react";
import Container from "modules/Core/components/ui-kit/Container"
import useSchemaFormFields from "../Form/hooks/useSchemaFormFields"
import styles from "./styles.module.scss";
import { InputLabel } from "../../ui-kit/Input";

const ObjectField = ({ onChange, value, label, fields, initialState = {}, className }) => {
    const { fields: content, state, setState } = useSchemaFormFields({ fields }, initialState, {
        highlightable: false,
        cardless: true
    });

    useEffect(() => {
        onChange(state)
    }, [state]);
    
    useEffect(() => {
        value && setState(value)
    }, []);

    return (
        <Container className={cx(styles.container, className)}>
            {label && <InputLabel label={label} />}
            <Container className={styles.fieldsContainer} >
                {content}
            </Container>
        </Container>
    )
};

export default ObjectField;