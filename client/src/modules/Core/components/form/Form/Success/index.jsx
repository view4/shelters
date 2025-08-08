import Container from "modules/Core/sub-modules/ui-kit/components/Container"
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import RedirectButton from "modules/Core/sub-modules/ui-kit/components/RedirectButton";
import { Thumbs } from "modules/Core/sub-modules/ui-kit/components/indicators";
import styles from "./styles.module.scss";
import Card from "modules/Core/sub-modules/ui-kit/components/Card";

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