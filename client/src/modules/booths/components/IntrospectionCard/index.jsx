import cx from "classnames";
import strapped from "modules/Core/higher-order-components/strapped";
import { useIsOpen } from "modules/Core/hooks/useIsOpen";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import { Focus, Minimise } from "modules/Core/sub-modules/ui-kit/components/indicators";
import withShouldRender from "modules/Core/higher-order-components/withShouldRender";
import Card from "modules/Core/sub-modules/ui-kit/components/Card";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import styles from "./styles.module.scss";

const CardHeader = ({ title, isOpen, toggle, actions }) => (
    <Container className={styles.cardHeader} flex spaceBetween maxWidth alignCenter>
        <Container>
            <Title>
                {title}
            </Title>
        </Container>
        <Container>
            {actions?.map(({ Component = Button, ...props }, index) => (
                <Component key={index} {...props} />
            ))}
            <Button onClick={toggle}>
                {isOpen ? <Minimise /> : <Focus />}
            </Button>
        </Container>
    </Container>
)

// TODO: improve the UI of this please...
const Placeholder = withShouldRender(() => <Card className={styles.card} />)

const Component = ({ children, className, actions, title, isOpen, open, close, toggle, ...props }) => (
    <>
        <Card
            className={cx(styles.card, className, { [styles.focusedCard]: isOpen })}
            HeaderComponent={CardHeader}
            headerProps={{ title, isOpen, actions, open, close, toggle }}
            {...props}
        >
            {children}
        </Card>
        <Placeholder shouldRender={Boolean(isOpen)} />
    </>
)


export default strapped(
    Component,
    ({ title, }) => {
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