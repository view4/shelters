import React from 'react';
import Button from 'modules/Core/sub-modules/ui-kit/components/Button';
import { useIsOpen } from 'modules/Core/hooks/useIsOpen';
import AuthModal from 'modules/auth/components/AuthModal';

const AuthenticationButton = ({ children, text, authMode = 'login', ...buttonProps }) => {
    const controls = useIsOpen(false);

    return (
        <>
            <Button {...buttonProps} onClick={(e) => { buttonProps?.onClick?.(e); controls.open(); }}>
                {children ?? text}
            </Button>
            <AuthModal isOpen={controls.isOpen} onClose={controls.close} initialMode={authMode} />
        </>
    );
};

export default AuthenticationButton;


