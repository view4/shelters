import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import c from "classnames";
import Modal from "modules/Core/sub-modules/ui-kit/components/Modal";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Card from "modules/Core/sub-modules/ui-kit/components/Card";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import Input from "modules/Core/sub-modules/ui-kit/components/Input";
import ProviderBasedAuthentication from "modules/auth/components/ProviderBasedAuthentication";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import cells from "modules/auth/state";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

const AuthModal = ({ isOpen, onClose, initialMode = "login", className, login, register }) => {
    const [mode, setMode] = useState(initialMode);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const nav = useNavigate();

    useEffect(() => {
        setMode(initialMode);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    }, [initialMode, isOpen]);

    const onSuccess = useCallback((res) => {
        if (res) {
            nav("/.");
            onClose?.();
        }
    }, [nav, onClose]);

    const onSubmit = useCallback(() => {
        if (mode === "register") {
            register({ email, password, callback: onSuccess, confirmPassword });
        } else {
            login({ email, password, callback: onSuccess });
        }
    }, [mode, email, password, register, login, onSuccess]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} bodyClassName={c(styles.body, className)}>
            <Container className={styles.container}>
                <Card className={styles.card}>
                    <Container className={styles.form}>
                        <Input label="Email" value={email} onChange={setEmail} />
                        <Input label="Password" value={password} onChange={setPassword} type="password" />
                        {mode === "register" && (
                            <Input label="Confirm Password" value={confirmPassword} onChange={setConfirmPassword} type="password" />
                        )}
                    </Container>
                    <Container className={styles.actions}>
                        <Button onClick={onSubmit}>{mode === "register" ? "Register" : "Login"}</Button>
                        <Button onClick={onClose} nature="grey-blue">Close</Button>
                    </Container>
                    <Container className={styles.switchRow}>
                        {mode === "login" ? (
                            <Container className={styles.switchText}>
                                Already created an account? <Button nature="link" onClick={() => setMode("register")}>Register here</Button>
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
                        <ProviderBasedAuthentication providerKey="google" onSuccess={onSuccess} />
                    </Container>
                </Card>
            </Container>
        </Modal>
    );
};

export default strappedConnected(
    AuthModal,
    {},
    { login: cells.login.action, register: cells.register.action },
    () => ({})
);


