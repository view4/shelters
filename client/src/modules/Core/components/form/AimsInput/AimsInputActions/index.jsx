import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Footer from "modules/Core/sub-modules/ui-kit/components/layout/Footer";
import Action from "modules/Posts/components/PostActions/Action";
import { EditNote, RemoveCircle } from "modules/Core/sub-modules/ui-kit/components/indicators";
import styles from "./styles.module.scss";

const AimsInputActions = ({ onDelete, onEdit }) => (
    <Footer className={styles.container}>
        <Container flex>
            <Action Indicator={EditNote} action={onEdit} />
            <Action Indicator={RemoveCircle} action={onDelete} />
        </Container>
    </Footer>
)

export default AimsInputActions