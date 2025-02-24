import Container from "modules/Core/components/ui-kit/Container"
import Input from "modules/Core/components/ui-kit/Input"
import Screen from "modules/Core/components/ui-kit/Screen"
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import cells from "../../state";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "modules/Core/components/ui-kit/Card";
import Button from "modules/Core/components/ui-kit/Button";

const Login = ({ email, password, onSubmit, setEmail, setPassword }) => {
    return (
        <Screen>
            <Card>
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
        const nav = useNavigate()
        const callback = () => nav("/")
        return {
            email,
            password,
            setEmail,
            setPassword,
            onSubmit: () => login({ email, password }, callback)
        }

    }
)