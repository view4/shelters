import Modal from 'modules/Core/components/ui-kit/Modal';
import SchemaForm from "modules/Core/components/form/Form/SchemaForm";

export default ({ close, isOpen, schema, onSubmit }) => (
    <Modal isOpen={isOpen} onClose={close}>
        <SchemaForm schema={schema} onSubmit={onSubmit} />
    </Modal>
)
