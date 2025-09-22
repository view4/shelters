import cx from "classnames";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import { ConditionalContainer, ExpandableOptions } from "modules/Core/sub-modules/ui-kit/exports";
import withShouldRender from "modules/Core/higher-order-components/withShouldRender";
import { InfoComponent } from "modules/booths/components/InfoComponent/component";
import styles from "./styles.module.scss";

const Options = withShouldRender(ExpandableOptions)
const Info = withShouldRender(InfoComponent)

const BoothsScreenHeader = ({ header, options, subheading, className, infoKey }) => (
    <Container flex col className={cx(styles.container, className)}>
        <Container className={styles.titleContainer} flex maxWidth>
            <Title className={styles.title}>
                {header}
            </Title>
            <Container className={styles.titleAppendagesContainer} col flex>
                <Info key={infoKey} shouldRender={Boolean(infoKey)} />
                <Options optionsOrigin="left" tridot options={options} shouldRender={Boolean(options?.length)} />
            </Container>
        </Container>
        <ConditionalContainer className={styles.subheadingContainer} shouldRender={Boolean(subheading)}>
            <Title Element="span" className={styles.subheading}>
                {subheading}
            </Title>
        </ConditionalContainer>
    </Container>
)

export default BoothsScreenHeader