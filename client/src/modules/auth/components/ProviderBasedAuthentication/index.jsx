import React, { useCallback } from 'react';
import Button from 'modules/Core/sub-modules/ui-kit/components/Button';
import Container from 'modules/Core/sub-modules/ui-kit/components/Container';
import Text from 'modules/Core/sub-modules/ui-kit/components/Text';
import strappedConnected from 'modules/Core/higher-order-components/strappedConnected';
import cells from 'modules/auth/state';
import { providerBasedAuthentication } from 'modules/auth/utils';
import { graphqlClient } from 'modules/Core/middleware';
import useOnSuccess from 'modules/Core/sub-modules/Dialog/hooks/useOnSuccess';

const ProviderBasedAuthentication = ({ providerKey = 'google', text, onSuccess, mode, validateToken }) => {
    const success = useOnSuccess();
    const onClick = useCallback(async () => {
        try {
            const user = await providerBasedAuthentication(providerKey);
            console.log(user)

            if (mode === "register") {
                success("Successfully registered");
            } else {
                success("Successfully logged in");
            }
            if (user) {
                console.log("inside validate")
                console.log(onSuccess)
                graphqlClient.setAuthToken(user.accessToken);
                validateToken({ user, callback: () => onSuccess?.(user) });
            }
        } catch (e) {
            console.log(e)
            // provider util already handles specific errors
        }
    }, [providerKey, onSuccess, validateToken, mode]);

    return (
        <Button onClick={onClick} className={"provider-auth-btn"}>
            <Container style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {/* Simple Google G icon as SVG */}
                <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.651,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
                    s5.373-12,12-12c3.059,0,5.842,1.154,7.957,3.043l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
                    s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,16.108,18.961,13,24,13c3.059,0,5.842,1.154,7.957,3.043l5.657-5.657
                    C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.201l-6.192-5.238C28.242,35.091,26.211,36,24,36
                    c-5.202,0-9.619-3.317-11.283-7.953l-6.541,5.036C9.477,39.556,16.227,44,24,44z"/>
                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.234-2.231,4.166-3.994,5.559
                    c0.001-0.001,0.002-0.001,0.003-0.002l6.192,5.238C36.965,39.557,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                </svg>
                <Text>{text || 'Continue with Google'}</Text>
            </Container>
        </Button>
    );
};

export default strappedConnected(
    ProviderBasedAuthentication,
    {},
    { validateToken: cells.validateToken.action },
    () => ({})
);


