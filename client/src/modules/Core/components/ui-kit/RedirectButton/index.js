import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "../Button";
import withShouldRender from 'modules/Core/higher-order-components/withShouldRender';

const RedirectButton = ({ to, children, ...props}) => {
    const navigate = useNavigate();
    const onClick = useCallback(() => navigate(to), [navigate, to])
    return <Button {...props} onClick={onClick} >{children}</Button>
}

export default withShouldRender(RedirectButton);