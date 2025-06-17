import React from "react";
import SchemaForm from "modules/Core/components/form/Form/SchemaForm";
import { BOOTH_SCHEMA } from "modules/booths/components/screens/CreateBoothScreen";
import Screen from "modules/Core/components/ui-kit/Screen";
import styles from "./styles.module.scss";

const CreateMapalBoothScreen = ({ onSubmit }) => {
    return (
        <Screen className={styles.container}>
            <SchemaForm
                schema={BOOTH_SCHEMA}
                onSubmit={onSubmit}
            />
        </Screen>
    );
};

export default CreateMapalBoothScreen; 