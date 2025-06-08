import React from "react";
import Container from "modules/Core/components/ui-kit/Container";
import SchemaForm from "modules/Core/components/form/Form/SchemaForm";
import { BOOTH_SCHEMA } from "modules/booths/components/screens/CreateBoothScreen";
import styles from "./styles.module.scss";

const CreateMapalBoothScreen = ({ onSubmit }) => {
    return (
        <Container className={styles.container}>
            <SchemaForm
                schema={BOOTH_SCHEMA}
                onSubmit={onSubmit}
            />
        </Container>
    );
};

export default CreateMapalBoothScreen; 