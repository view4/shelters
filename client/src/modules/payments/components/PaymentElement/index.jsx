import NextButton from 'modules/Core/components/ui-kit/Button/NextButton';
import Container from 'modules/Core/components/ui-kit/Container';
import useOnError from 'modules/Core/sub-modules/Dialog/hooks/useOnError';
import useOnSuccess from 'modules/Core/sub-modules/Dialog/hooks/useOnSuccess';
import usePayment from 'modules/payments/hooks/usePayment';
import usePaymentElement from 'modules/payments/hooks/usePaymentElement';
import { useCallback } from 'react';

const PaymentElement = ({ clientSecret, options }) => {
    const jsx = usePaymentElement({ clientSecret, options });
    const { submit, isLoading } = usePayment();
    const onSuccess = useOnSuccess();
    const onError = useOnError();

    const onSubmit = useCallback(async () => {
        if (isLoading) return;
        const { success } = await submit();
        if (success) return onSuccess("Payment successful");
        return onError("Payment failed");
    }, [isLoading, submit]);

    return (
        <Container>
            {jsx}
            <NextButton
                onClick={onSubmit}
                loading={isLoading}
                disabled={!clientSecret}
            >
                Next
            </NextButton>
        </Container>

    )
}

export default PaymentElement;