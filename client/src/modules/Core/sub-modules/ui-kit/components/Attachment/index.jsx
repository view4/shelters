import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";
import { Article } from "modules/Core/sub-modules/ui-kit/components/indicators"
import styles from "./styles.module.scss";

const Attachment = ({ name, url }) => (
    <Container className={styles.container} col flex center>
        <a href={url} target="_blank" rel="noreferrer" >
            <Article color={"#3C3B3B"} />
            <Text>
                {name?.substring(0, 20)}
            </Text>
        </a>
    </Container>
);

export default Attachment;