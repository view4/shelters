import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import Card from "modules/Core/sub-modules/ui-kit/components/Card";
import styles from "./styles.module.scss";
import AdminScreen from "../../AdminScreen";

export default () => (
    <AdminScreen>
        <Container className={styles.container}>
            <Container className={styles.header}>
                <Title text="Admin Dashboard" Element="h1" />
            </Container>
            <Container className={styles.cardsContainer}>
                <Card className={styles.card}>
                    <Title text="Invitations" Element="h2" />
                    <Container>
                        Manage invitations here
                    </Container>
                </Card>
                <Card className={styles.card}>
                    <Title text="Users" Element="h2" />
                    <Container>
                        Manage users here
                    </Container>
                </Card>
                <Card className={styles.card}>
                    <Title text="Subscriptions" Element="h2" />
                    <Container>
                        Manage subscriptions here
                    </Container>
                </Card>
            </Container>
        </Container>
    </AdminScreen>
);

