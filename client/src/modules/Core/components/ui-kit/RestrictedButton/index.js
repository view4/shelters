import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import useOnError from 'modules/Core/sub-modules/Dialog/hooks/useOnError';
import Button from '../Button';

const RestrictedButton = ({
    restrictionSelector,
    onRestrictionMessage,
    onClick,
    ...props
}) => {
    const isPermitted = useSelector(restrictionSelector);
    const onError = useOnError();
    const _onClick = useCallback((...args) => {
        if (!isPermitted) return onError(onRestrictionMessage);
        onClick(...args);
    }, [isPermitted, onClick]);
    return <Button {...props} onClick={_onClick} />
};

export default RestrictedButton;