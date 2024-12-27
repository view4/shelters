import Modal from 'modules/Core/components/ui-kit/Modal';
import SchemaForm from "modules/Core/components/form/Form/SchemaForm";
import Title from 'modules/Core/components/ui-kit/Title';
import Container from 'modules/Core/components/ui-kit/Container';

export default ({ isOpen, close, title= "Add Roadmap", schema, initialState, onSubmit, ...props }) => {
    return (
        <Modal isOpen={isOpen} onClose={close}>
            <Container p1>
                <Title text={title} />
            </Container>
            <SchemaForm 
                schema={schema}
                initialState={initialState}
                onSubmit={onSubmit}
                {...props}
            />
        </Modal>
    )
}