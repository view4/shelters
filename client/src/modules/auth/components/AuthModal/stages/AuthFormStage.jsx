import React from "react";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import Input from "modules/Core/sub-modules/ui-kit/components/Input";
import ProviderBasedAuthentication from "modules/auth/components/ProviderBasedAuthentication";
import styles from "../styles.module.scss";

export default ({ 
    mode, 
    setMode, 
    email, 
    password, 
    setPassword, 
    confirmPassword, 
    setConfirmPassword, 
    onSubmit, 
    onSuccess,
    onClose 
}) => {
    return (
        <>
            <Container className={styles.form}>
                <Input 
                    label="Email" 
                    value={email} 
                    onChange={() => {}} 
                    disabled={true}
                />
                <Input 
                    label="Password" 
                    value={password} 
                    onChange={setPassword} 
                    type="password" 
                />
                {mode === "register" && (
                    <Input 
                        label="Confirm Password" 
                        value={confirmPassword} 
                        onChange={setConfirmPassword} 
                        type="password" 
                    />
                )}
            </Container>
            <Container className={styles.actions}>
                <Button onClick={onSubmit}>
                    {mode === "register" ? "Register" : "Login"}
                </Button>
                <Button onClick={onClose} nature="grey-blue">Close</Button>
            </Container>
            <Container className={styles.switchRow}>
                {mode === "login" ? (
                    <Container className={styles.switchText}>
                        Don't have an account? <Button nature="link" onClick={() => setMode("register")}>Register here</Button>
                    </Container>
                ) : (
                    <Container className={styles.switchText}>
                        Already have an account? <Button nature="link" onClick={() => setMode("login")}>Login here</Button>
                    </Container>
                )}
            </Container>
            <Container className={styles.divider}>
                <span className={styles.rule} />
                <span className={styles.or}>or</span>
                <span className={styles.rule} />
            </Container>
            <Container className={styles.providersRow}>
                <ProviderBasedAuthentication 
                    providerKey="google" 
                    mode={mode} 
                    onSuccess={onSuccess} 
                />
            </Container>
        </>
    );
};

