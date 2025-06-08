
import c from "classnames";
import Button from "modules/Core/components/ui-kit/Button";
import Container from "modules/Core/components/ui-kit/Container";
import strapped from "modules/Core/higher-order-components/strapped";
import Card from "..";
import { useIsOpen } from "modules/Core/hooks/useIsOpen";
import DescriptiveExpandableCard from "./DescriptiveExpandableCard";
import styles from "./styles.module.scss";

export const ExpandableCardComponent = ({
    label,
    title,
    children,
    isOpen,
    open,
    toggle = open,
    className,
    openClassName,
    contentClassName,
    size = "sm",
    toggleButtonClassName,
    HeaderComponent,
    headerProps,
    openOnHeaderClick = true,
    ...props
}) => (
    <Card
        className={c(
            styles.container,
            className,
            {
                [styles.open]: isOpen,
                [openClassName]: isOpen,
                [styles[size]]: Boolean(size)
            }
        )}
        contentClassName={styles.content}
        header={label ?? title}
        HeaderComponent={HeaderComponent}
        headerProps={{
            onClick: openOnHeaderClick ? toggle : undefined,
            children: children && (
                <Container flex row alignCenter>
                    {headerProps?.appendage}
                    <Button className={c(styles.chevronBtn, toggleButtonClassName)} onClick={toggle} hover={false} />
                </Container>
            ),
            Element: "h4",
            className: styles.header,
            ...headerProps

        }}
        {...props}
    >
        {
            isOpen && <Container bt1grey maxHeight className={c(styles.contentContainer, contentClassName)}>
                {children}
            </Container>
        }
    </Card>
);

const _ExpandableCardComponent = ({ description, ...props }) => {
    if (description) return <DescriptiveExpandableCard description={description} {...props} />
    return <ExpandableCardComponent {...props} />
}

export default strapped(
    _ExpandableCardComponent,
    ({ defaultOpen }) => useIsOpen(defaultOpen)
);