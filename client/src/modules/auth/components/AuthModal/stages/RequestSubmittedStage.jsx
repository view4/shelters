import React from "react";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import styles from "../styles.module.scss";

export default ({ onBackToHome }) => {
    return (
        <>
            <Container className={styles.form}>
                <Text className={styles.successTextFirst}>
                    Your invitation request has been submitted successfully! 
                </Text>
                <Text className={styles.successText}>
                    Your application is pending review. Please check back in a couple of days.
                </Text>
            </Container>
            <Container className={styles.actions}>
                <Button onClick={onBackToHome}>Back to Home</Button>
            </Container>
        </>
    );
};

