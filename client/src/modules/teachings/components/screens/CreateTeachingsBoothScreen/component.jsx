import React from "react";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import SchemaForm from "modules/Core/components/form/Form/SchemaForm";
import { BOOTH_SCHEMA } from "modules/booths/components/screens/CreateBoothScreen";
import styles from "./styles.module.scss";

const CreateTeachingsBoothScreen = ({ onSubmit, parentId }) => {
    return (
        <Container className={styles.container}>
            <SchemaForm
                schema={BOOTH_SCHEMA}
                onSubmit={onSubmit}
                parentId={parentId}
            />
        </Container>
    );
};

export default CreateTeachingsBoothScreen; 