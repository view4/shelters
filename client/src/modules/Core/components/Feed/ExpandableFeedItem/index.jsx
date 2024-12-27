import { ExpandableCardComponent } from 'modules/Core/components/ui-kit/Card/ExpandableCard';
import Container from 'modules/Core/components/ui-kit/Container';
import Text from 'modules/Core/components/ui-kit/Text';
import styles from "./styles.module.scss";
import React from 'react';
import Button from '../../ui-kit/Button';
import ConditionalContainer from '../../ui-kit/ConditionalContainer';
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