import cx from "classnames";
import strapped from "modules/Core/higher-order-components/strapped";
import { useIsOpen } from "modules/Core/hooks/useIsOpen";
import Title from "modules/Core/components/ui-kit/Title";
import Button from "modules/Core/components/ui-kit/Button";
import { Focus, Minimise } from "modules/Core/components/ui-kit/indicators";
import withShouldRender from "modules/Core/higher-order-components/withShouldRender";
import styles from "./styles.module.scss";
import Card from "modules/Core/components/ui-kit/Card";
import Container from "modules/Core/components/ui-kit/Container";

const CardHeader = ({ title, isOpen, toggle }) => (
    <Container className={styles.cardHeader} flex spaceBetween maxWidth alignCenter>
        <Container>
            <Title>
                {title}
            </Title>
        </Container>
        <Container>
            <Button onClick={toggle}>
                {isOpen ? <Minimise /> : <Focus />}
            </Button>
        </Container>
    </Container>
)

// TODO: improve the UI of this please...
const Placeholder = withShouldRender(() => <Card className={styles.card} />)

const Component = ({ children, className, title, isOpen, open, close, toggle, ...props }) => (
    <>
        <Card
            className={cx(styles.card, className, { [styles.focusedCard]: isOpen })}
            HeaderComponent={CardHeader}
            headerProps={{ title, isOpen, open, close, toggle }}
            {...props}
        >
            {children}
        </Card>
        <Placeholder shouldRender={Boolean(isOpen)} />
    </>
)


export default strapped(
    Component,
    ({ title,}) => {
        const { isOpen, open, close, toggle } = useIsOpen();

        return {
            title,
            isOpen,
            open,
            close,
            toggle
        }
    },
    { withIsOpen: true }
)