import Modal from "modules/Core/components/ui-kit/Modal";
import styles from "./styles.module.scss";
import Container from "modules/Core/components/ui-kit/Container";
import EntityForm from "modules/Core/components/form/EntityForm";

const EntityFormModal = ({ FormComponent = EntityForm, isOpen, close, ...props }) => (
    <Modal
        isOpen={isOpen}
        onClose={close}
        className={styles.container}
    >
        <Container className={styles.container}>
            <FormComponent
                shouldRender={isOpen}
                onSuccess={close}
                {...props}
            />
        </Container>
    </Modal>
);

export default EntityFormModal;