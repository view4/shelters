import Container from "modules/Core/sub-modules/ui-kit/components/Container"
import Input from "modules/Core/sub-modules/ui-kit/components/Input"
import Screen from "modules/Core/sub-modules/ui-kit/components/Screen"
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import cells from "modules/auth/state";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "modules/Core/sub-modules/ui-kit/components/Card";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import styles from "./styles.module.scss";

const Login = ({ email, password, onSubmit, setEmail, setPassword }) => {
    return (
        <Screen header="Login" className={styles.container}>
            <Card className={styles.card}>
                <Input label="Email" value={email} onChange={setEmail} />
                <Input label="Password"
                    value={password}
                    onChange={setPassword}
                    type="password" />
                <Container flex flexEnd>
                    <Button onClick={onSubmit}>
                        Login
                    </Button>
                </Container>

            </Card>
        </Screen>
    )
};

export default strappedConnected(
    Login,
    {},
    { login: cells.login.action },
    ({ login }) => {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const nav = useNavigate();
        const callback = (res) => res && nav("/");
        return {
            email,
            password,
            setEmail,
            setPassword,
            onSubmit: () => login({ email, password, callback })
        }

    }
)