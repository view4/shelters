import Modal from 'modules/Core/sub-modules/ui-kit/components/Modal';
import SchemaForm from "modules/Core/components/form/Form/SchemaForm";
import Title from 'modules/Core/sub-modules/ui-kit/components/Title';
import Container from 'modules/Core/sub-modules/ui-kit/components/Container';

export default ({ isOpen, close, title = "Add Entry", schema, initialState, onSubmit }) => (
    <Modal isOpen={isOpen} onClose={close}>
        <Container p1 >
            <Title text={title} />
        </Container>
        <SchemaForm
            schema={schema}
            initialState={initialState}
            onSubmit={onSubmit}
        />
    </Modal>
)

