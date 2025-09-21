import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import { ExpandableOptions } from "modules/Core/sub-modules/ui-kit/exports";
import withShouldRender from "modules/Core/higher-order-components/withShouldRender";
import styles from "./styles.module.scss";

const Options = withShouldRender(ExpandableOptions, "options")
const InfoIndicator = () => <Container className={styles.iIndicator}></Container>

const BoothsScreenHeader = ({ header, options }) => (
    <Container className={styles.container}>
        <Container flex>
            <Title className={styles.title}>
                {header}
            </Title>
            <Container className={styles.appendagesContainer} col flex>
                <InfoIndicator />
                <Options optionsOrigin="left" tridot options={options} />
            </Container>
        </Container>
    </Container>
)

export default BoothsScreenHeader