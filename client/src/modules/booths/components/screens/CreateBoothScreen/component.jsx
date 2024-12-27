import SchemaForm from "modules/Core/components/form/Form/SchemaForm";
import Container from "modules/Core/components/ui-kit/Container";
import Title from "modules/Core/components/ui-kit/Title";

export default ({ schema, onSubmit }) => (
    <Container>
        <Title text="Create Booth" />
        <SchemaForm 
            schema={schema} 
            onSubmit={onSubmit} 
        />
    </Container>
)