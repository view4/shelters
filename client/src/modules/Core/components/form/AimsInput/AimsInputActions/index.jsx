import Container from "modules/Core/components/ui-kit/Container";
import Footer from "modules/Core/components/ui-kit/layout/Footer";
import Action from "modules/Posts/components/PostActions/Action";
import { EditNote, RemoveCircle } from "modules/Core/components/ui-kit/indicators";
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