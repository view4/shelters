import SchemaForm from "modules/Core/components/form/Form/SchemaForm";
import Container from "modules/Core/components/ui-kit/Container";
import Title from "modules/Core/components/ui-kit/Title";
import Button from "modules/Core/components/ui-kit/Button";
import Screen from "modules/Core/components/ui-kit/Screen";

export default ({ schema, onSubmit }) => (
    <Screen  spaceBetween flex col>
        <Container >
        <Title text="Create Booth" />
        <SchemaForm 
            schema={schema} 
                onSubmit={onSubmit} 
            />
        </Container>
        <Container mb3>
            <Button mb3 text='Create Mapal Booth' to="/mapal/create" panel />
        </Container>
    </Screen>
)