import Container from "modules/Core/components/ui-kit/Container"
import Title from "modules/Core/components/ui-kit/Title";
import RedirectButton from "modules/Core/components/ui-kit/RedirectButton";
import { Thumbs } from "modules/Core/components/ui-kit/indicators";
import styles from "./styles.module.scss";
import Card from "modules/Core/components/ui-kit/Card";

const Success = ({ text, redirect, redirectText }) => (
    <Container center flex col className={styles.container} maxWidth maxHeight>
        <Card lightShadow borderless flex col center >
            <Thumbs color={'#1976d2b8'} fill={"#1976d2b8"} />
            <Title Element="h4">{text}</Title>
            <RedirectButton
                shouldRender={Boolean(redirect)}
                to={redirect}
                text={redirectText}
                nature={'ocean-blue'}
            />
        </Card>
    </Container>
)

export default Success;