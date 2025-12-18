import Screen from "modules/Core/sub-modules/ui-kit/components/Screen";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";
import styles from "./styles.module.scss";

const NotFoundPage = () => {
    return (
        <Screen
            header="Shelters App"
            className={styles.screen}
        >
            <Container flex center alignCenter className={styles.container}>
                <Container flex column center alignCenter className={styles.content}>
                    <Title className={styles.title}>404</Title>
                    <Text className={styles.text}>Page Not Found</Text>
                    <Text className={styles.subtext}>
                        The page you're looking for doesn't exist.
                    </Text>
                    <Button to="/" className={styles.button}>
                        Go Home
                    </Button>
                </Container>
            </Container>
        </Screen>
    );
};

export default NotFoundPage;

