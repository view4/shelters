import cx from "classnames";
import { useMemo } from "react";
import strapped from "modules/Core/higher-order-components/strapped";
import { useIsOpen } from "modules/Core/hooks/useIsOpen";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import { Focus, Minimise } from "modules/Core/sub-modules/ui-kit/components/indicators";
import withShouldRender from "modules/Core/higher-order-components/withShouldRender";
import Card from "modules/Core/sub-modules/ui-kit/components/Card";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import withRecursiveRender from "modules/Core/higher-order-components/withRecursiveRender";
import styles from "./styles.module.scss";

const CardHeader = ({ title, isOpen, toggle, actions, onClick }) => (
    <Container 
        className={styles.cardHeader} 
        flex 
        spaceBetween 
        maxWidth 
        alignCenter
        onClick={onClick}
    >
        <Container>
            <Title>
                {title}
            </Title>
        </Container>
        <Container onClick={e => e.stopPropagation()}>
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

const Component = ({ children, onHeaderPress, className, actions, title, isOpen, open, close, toggle, headerProps, ...props }) => (
    <>
        <Card
            className={cx(styles.card, className, { [styles.focusedCard]: isOpen, 'focused': isOpen })}
            HeaderComponent={CardHeader}
            contentClassName={styles.cardContentContainer}
            headerProps={headerProps}
            {...props}
        >
            {children}
        </Card>
        <Placeholder shouldRender={Boolean(isOpen)} />
    </>
)


const IntrospectionCard  = strapped(
    Component,
    ({ title, onHeaderPress, actions }) => {
        const { isOpen, open, close, toggle } = useIsOpen();

        return {
            title,
            isOpen,
            open,
            close,
            toggle,
            headerProps: useMemo(() => ({
                title,
                isOpen,
                actions,
                open,
                close,
                toggle,
                onClick: onHeaderPress
            }), [title, isOpen, actions, open, close, toggle, onHeaderPress])
        }
    },
    { withIsOpen: true }
)

const CollapsibleIntrospectionCard = strapped(
    IntrospectionCard,
    ({ actions, defaultCollapsed = false }) => {
        const { isOpen: isCollapsed, open: collapse, close: uncollapse, toggle: toggleCollapse } = useIsOpen(defaultCollapsed);

        return {
            onHeaderPress: toggleCollapse,
            className: cx(
                styles.collapsibleCard,
                { [styles.collapsed]: isCollapsed }
            )
        }
    },
    { withIsOpen: true }
)

export default withRecursiveRender(
    {
        collapsible: CollapsibleIntrospectionCard
    },
    IntrospectionCard
)