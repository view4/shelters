
import c from "classnames";
import Container from "../Container";
import withShouldRender from "modules/Core/higher-order-components/withShouldRender";
import Header from "../layout/Header";
import ConditionalContainer from "../ConditionalContainer";
import styles from "./styles.module.scss";

const Component = ({
    children,
    className,
    contentContainerProps,
    header,
    contentClassName,
    headerProps: { className: cardClassName, ...headerProps } = {},
    HeaderComponent = Header,
    appendage,
    ...props
}) => (
    <Container relative className={c(className, styles.card)} {...props}>
        <HeaderComponent
            shouldRender={Boolean(header)}
            title={header}
            className={c(styles.header, cardClassName)}
            {...headerProps}
            fixed={false}
        />
        {appendage}
        <ConditionalContainer
            shouldRender={Boolean(children)}
            className={c(styles.content, contentClassName)}
            {...contentContainerProps}
            maxHeight
        >
            {children}
        </ConditionalContainer>
    </Container>
)

const Card = withShouldRender(Component)


export default Card
