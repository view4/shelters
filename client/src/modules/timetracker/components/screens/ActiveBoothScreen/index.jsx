// const { default: Container } = require("modules/Core/components/ui-kit/Container")
import Container from "modules/Core/components/ui-kit/Container"

const BoothScreen = () => {
    return (
        <Container>
            Booth Screen
        </Container>
    )
}

const ActiveBoothScreen = () => {
    return <BoothScreen />
}


export default ActiveBoothScreen;