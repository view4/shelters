import { useMemo } from 'react';
import { PaymentElement } from '@stripe/react-stripe-js';

export default  ({ clientSecret, options }) => {
    return useMemo(() => {
        return (
            <PaymentElement
                clientSecret={clientSecret}
                options={options}
            />
        )
    }, [clientSecret, options])
}
