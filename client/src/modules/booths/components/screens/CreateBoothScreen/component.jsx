import SchemaForm from "modules/Core/components/form/Form/SchemaForm";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import Screen from "modules/Core/sub-modules/ui-kit/components/Screen";

export default ({ schema, onSubmit }) => (
    <Screen spaceBetween flex col>
        <Container >
            <Title text="Create Booth" />
            <SchemaForm
                schema={schema}
                onSubmit={onSubmit}
            />
        </Container>
        <Container mb3>
            <Button mb3 text='Create Mapal Booth' to="/mapal/create" panel />
            <Button mb3 text='Create Malchut Booth' to="/teachings/create" panel />
        </Container>
    </Screen>
)