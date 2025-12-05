import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import AdminScreen from "../../AdminScreen";
import styles from "./styles.module.scss";


export default () => (
    <AdminScreen>
        <Container className={styles.container}>
            <Container className={styles.header}>
                <Title text="Users" Element="h1" />
            </Container>
            <AdminUserFeed />
        </Container>
    </AdminScreen>
);

