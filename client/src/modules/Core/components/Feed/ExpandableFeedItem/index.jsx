import { ExpandableCardComponent } from 'modules/Core/sub-modules/ui-kit/components/Card/ExpandableCard';
import Container from 'modules/Core/sub-modules/ui-kit/components/Container';
import Text from 'modules/Core/sub-modules/ui-kit/components/Text';
import styles from "./styles.module.scss";
import React from 'react';
import Button from 'modules/Core/sub-modules/ui-kit/components/Button';
import ConditionalContainer from 'modules/Core/sub-modules/ui-kit/components/ConditionalContainer';
import strapped from 'modules/Core/higher-order-components/strapped';
import { useIsOpen } from 'modules/Core/hooks/useIsOpen';

const ExpandableFeedItem = ({ name, toggle, id, text, children, ChildComponent = React.Fragment, headerProps, hideButtonOnOpen = true, ...props }) => (
    <ExpandableCardComponent
        label={name}
        openClassName={styles.open}
        size={"lg"}
        toggleButtonClassName={hideButtonOnOpen && (styles.cardButton)}
        toggle={toggle}
        headerProps={{
            toggle,
            ...headerProps
        }}
        {...props}
    >
        <ConditionalContainer flexStart shouldRender={props?.isOpen}>
            <Container className={styles.internalContainer} flexStart flex col spaceBetween>
                {text && <Text>{text}</Text>}
                <ChildComponent id={id} {...props} />
                {children}
            </Container>
        </ConditionalContainer>

        <Container maxWidth flex center>
            <Button onClick={toggle}>
                <span className='chevron-up-container' />
            </Button>
        </Container>
    </ExpandableCardComponent>
)


export default strapped(
    ExpandableFeedItem,
    ({ defaultOpen, isControlled }) => !isControlled && useIsOpen(defaultOpen)
);