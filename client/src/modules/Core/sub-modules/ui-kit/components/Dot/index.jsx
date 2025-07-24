import React from 'react';
import Container from 'modules/Core/sub-modules/ui-kit/components/Container';
import withShouldRender from 'modules/Core/higher-order-components/withShouldRender';

const Dot = ({ children, className, size = '1rem', color='#3C3B3B', margin, borderRadius= '100%', ...props }) => (
    <Container
        className={className}
        style={{ height: size, width:size, backgroundColor: color, margin, borderRadius }}
        {...props}
    />
);

export default withShouldRender(Dot);