import withRecursiveRender from 'modules/Core/higher-order-components/withRecursiveRender';
import withUIKitClasses from 'modules/Core/higher-order-components/withUIKitClasses';
import React from 'react';
import BorderedTitle from './BorderedTitle';


const Title = ({ Element = 'h2', text, children, ...props }) => {
    return (
        <Element {...props}>{text || children}</Element>
    )
};

export default withUIKitClasses(withRecursiveRender({
    bordered: BorderedTitle,
}, Title));