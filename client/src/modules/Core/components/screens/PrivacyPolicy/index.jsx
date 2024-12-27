import Container from "../../ui-kit/Container"
import ExternalScreen from "../../ui-kit/Screen/ExternalScreen";
import html from "./html";
import styles from "./styles.module.scss";

const PrivacyPolicy = () => {
    return (
        <ExternalScreen>
            <Container mt3 p3 mb3 className={styles.container}>
                <div dangerouslySetInnerHTML={{__html: html}} />
            </Container>
        </ExternalScreen>
    )
}

export default PrivacyPolicy;