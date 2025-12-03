import React from "react";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import Input from "modules/Core/sub-modules/ui-kit/components/Input";
import styles from "../styles.module.scss";

export default ({ email, setEmail, onContinue, isChecking, onClose }) => {
    return (
        <>
            <Container className={styles.form}>
                <Input 
                    label="Email" 
                    value={email} 
                    onChange={setEmail}
                    disabled={isChecking}
                />
            </Container>
            <Container className={styles.actions}>
                <Button 
                    onClick={onContinue} 
                    disabled={!email || isChecking}
                >
                    {isChecking ? "Checking..." : "Continue"}
                </Button>
                <Button onClick={onClose} nature="grey-blue">Close</Button>
            </Container>
        </>
    );
};

