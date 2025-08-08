import { useCallback } from "react";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Form from "../index.jsx";
import useSchemaFormFields from "../hooks/useSchemaFormFields.jsx";
import ConditionalContainer from "modules/Core/sub-modules/ui-kit/components/ConditionalContainer/index.jsx";
import Title from "modules/Core/sub-modules/ui-kit/components/Title/index.js";
import styles from "./styles.module.scss";

const SchemaForm = ({ schema, initialState = {}, onSubmit, options, clearStateOnSubmit = true, ...props }) => {
    const { fields, state, setState } = useSchemaFormFields(
        schema,
        initialState,
        {
            ...options,
            cardless: props.cardless,
            asyncInitialState: props.asyncInitialState
        });

    const handleSubmit = useCallback((callback) => {
        onSubmit(state, callback);
        clearStateOnSubmit && setState({});
    }, [onSubmit, state, clearStateOnSubmit]);

    return (
        <Form
            onSubmit={handleSubmit}
            header={schema.header}
            {...props}
        >
            <Container className={styles.fieldsContainer} fullWidth >
                <ConditionalContainer shouldRender={Boolean(schema.subheader)}>
                    <Title className={styles.subheader} Element='h5'>{schema.subheader}</Title>
                </ConditionalContainer>
                {fields}
            </Container>
        </Form>
    )
};

export default SchemaForm;