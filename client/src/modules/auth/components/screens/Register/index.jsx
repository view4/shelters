import Container from "modules/Core/sub-modules/ui-kit/components/Container"
import Input from "modules/Core/sub-modules/ui-kit/components/Input"
import Screen from "modules/Core/sub-modules/ui-kit/components/Screen"
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import cells from "modules/auth/state";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "modules/Core/sub-modules/ui-kit/components/Card";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import styles from "./styles.module.scss";
import useOnError from "modules/Core/sub-modules/Dialog/hooks/useOnError";

const Register = ({ email, password, onSubmit, setEmail, setPassword, confirmPassword, setConfirmPassword }) => {
    return (
        <Screen header="Register" className={styles.container}>
            <Card className={styles.card}>
                <Input label="Email" value={email} onChange={setEmail} />
                <Input label="Password"
                    value={password}
                    onChange={setPassword}
                    type="password" />
                <Input label="Confirm Password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    type="password" />
                <Container flex flexEnd>
                    <Button onClick={onSubmit}>
                        Register
                    </Button>
                </Container>
            </Card>
        </Screen>
    )
};

export default strappedConnected(
    Register,
    {},
    { register: cells.register.action },
    ({ register }) => {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");
        const onError = useOnError()
        const nav = useNavigate()

        const onSubmit = useCallback(() => {
            if (password !== confirmPassword) {
                onError("Passwords do not match")
                return
            }
            register({ email, password, callback: (res) => res && nav("/") })
        }, [email, password, confirmPassword, register, onError, nav])

        return {
            email,
            password,
            setEmail,
            setPassword,
            onSubmit,
            confirmPassword,
            setConfirmPassword
        }

    }
)