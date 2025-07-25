import React, { useMemo } from "react";
import cx from 'classnames';
import Container from "modules/Core/sub-modules/ui-kit/components/Container"
import Input from "modules/Core/sub-modules/ui-kit/components/Input"
import strapped from "modules/Core/higher-order-components/strapped";
import { COMPONENT_TYPE_TREE } from "./const";
import Card from "modules/Core/sub-modules/ui-kit/components/Card";
import styles from "./styles.module.scss"
import withRecursiveRender from "modules/Core/higher-order-components/withRecursiveRender";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import { SET_FORM_FIELD } from "modules/Core/state/consts";

const SchemaFormField = ({
    type,
    label,
    Component = Input,
    Wrapper = Card,
    highlightable = true,
    cardless,
    userGuideKey,
    ...props
}) => (
    <Wrapper 
        className={cx(
            styles.container,
            {
                [styles.card]: !cardless,
                [styles[type]]: type,
                [styles.highlightable]: Boolean(highlightable)
            }
        )}
        userGuideKey={userGuideKey}
    >
        <Container>
            <Component label={label}  {...props} />
        </Container>
    </Wrapper>
);

const ConnectedSchemaFormField = strappedConnected(
    SchemaFormField,
    {
        value: (state, { moduleName, formFieldsKey }) => state[moduleName]?.form?.[formFieldsKey]
    },
    {
        onChange: (moduleName, key, value) => ({
            type: moduleName + '/' + SET_FORM_FIELD,
            payload: {
                key,
                value
            }
        })
    },
    ({ onChange, formFieldsKey, moduleName }) => ({
        onChange: (val) => onChange(moduleName, formFieldsKey, val)
    })
)

const Component = withRecursiveRender({
    moduleName: ConnectedSchemaFormField
}, SchemaFormField);

export default strapped(
    Component,
    ({
        type,
        Component: _Component,
        cardless,
        ...props
    }) => {
        return {
            Component: useMemo(() => _Component ?? COMPONENT_TYPE_TREE[type] ?? Input, [_Component, type]),
            Wrapper: useMemo(() => cardless ? Container : Card, [cardless])
        }
    }
);
