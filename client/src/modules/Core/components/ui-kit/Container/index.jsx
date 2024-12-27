import React from 'react';
import withUIKitClasses from 'modules/Core/higher-order-components/withUIKitClasses';

const Container = ({ children, className, ...props }) => (
    <div className={className} {...props}>
        {children}
    </div>
);

export default withUIKitClasses(Container)