import Modal from 'modules/Core/sub-modules/ui-kit/components/Modal';
import SchemaForm from "modules/Core/components/form/Form/SchemaForm";

export default ({ close, isOpen, schema, onSubmit }) => (
    <Modal isOpen={isOpen} onClose={close}>
        <SchemaForm schema={schema} onSubmit={onSubmit} />
    </Modal>
)
