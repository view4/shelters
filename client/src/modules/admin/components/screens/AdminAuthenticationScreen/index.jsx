import { Card, Container, Input } from "modules/Core/sub-modules/ui-kit/exports";
import { useState } from "react";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import styles from "./styles.module.scss";

const AdminAuthenticationScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const onSubmit = async () => {
        if (!email || !password) return;
        setIsSubmitting(true);
        try {
            console.log(email, password);
            // Add your authentication logic here
        } catch (error) {
            console.error("Login error:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    const isFormValid = email && password;

    return (
        <Container span flex center absolute className={styles.container}>
            <Card header="Admin Authentication" className={styles.card}>
                <Container className={styles.form}>
                    <Container className={styles.inputWrapper}>
                        <Input 
                            label="Email" 
                            value={email} 
                            onChange={setEmail}
                            type="email"
                            placeholder="admin@example.com"
                            disabled={isSubmitting}
                        />
                    </Container>
                    <Container className={styles.inputWrapper}>
                        <Input 
                            label="Password" 
                            value={password} 
                            onChange={setPassword}
                            type="password"
                            placeholder="Enter your password"
                            disabled={isSubmitting}
                        />
                    </Container>
                    <Container className={styles.buttonWrapper}>
                        <Button 
                            onClick={onSubmit}
                            disabled={!isFormValid || isSubmitting}
                            loading={isSubmitting}
                            className={styles.loginButton}
                        >
                            {isSubmitting ? "Logging in..." : "Login"}
                        </Button>
                    </Container>
                </Container>
            </Card>
        </Container>
    )
}

export default AdminAuthenticationScreen;