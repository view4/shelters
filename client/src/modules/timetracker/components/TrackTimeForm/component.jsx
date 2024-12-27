import Modal from 'modules/Core/components/ui-kit/Modal';
import SchemaForm from "modules/Core/components/form/Form/SchemaForm";


export default ({ isOpen, close, schema, onSubmit }) => {
    return (
        <Modal isOpen={isOpen} onClose={close}>
            <SchemaForm schema={schema} onSubmit={onSubmit} />
        </Modal>
    )
};;