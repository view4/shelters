// const { default: Container } = require("modules/Core/components/ui-kit/Container")
import SchemaForm from "modules/Core/components/form/Form/SchemaForm";
import Container from "modules/Core/components/ui-kit/Container"

const schema = {
    title: "Create Booth",
    fields: {
        name: {
            type: "text",
            label: "Name",
            required: true,
        },
        text: {
            type: "text",
            label: "Text Space",
            required: true,
        },
    }
}

const CreateBoothScreen = () => {
    return (
        <Container>
            <SchemaForm schema={schema} />
        </Container>
    )
}


export default CreateBoothScreen;