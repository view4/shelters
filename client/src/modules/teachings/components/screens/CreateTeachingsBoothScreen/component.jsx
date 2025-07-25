import React from "react";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import SchemaForm from "modules/Core/components/form/Form/SchemaForm";
import { BOOTH_SCHEMA } from "modules/booths/components/screens/CreateBoothScreen";
import styles from "./styles.module.scss";
import { merge } from "lodash";

const schema = merge(BOOTH_SCHEMA, { fields: { parent: { type: "string", } } })
console.log("schema", schema)

const CreateTeachingsBoothScreen = ({ onSubmit, initialState }) => {
    return (
        <Container className={styles.container}>
            <SchemaForm
                schema={schema}
                onSubmit={onSubmit}
                initialState={initialState}
            />
        </Container>
    );
};

export default CreateTeachingsBoothScreen; 