import React, { forwardRef } from 'react';
import withUIKitClasses from 'modules/Core/higher-order-components/withUIKitClasses';

const Container = forwardRef(({ children, className, ...props }, ref) => (
    <div className={className} {...props} ref={ref}>
        {children}
    </div>
));

export default withUIKitClasses(Container)