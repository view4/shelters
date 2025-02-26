import { useCallback } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';

export default () => {
    const [isLoading, setIsLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const submit = useCallback(async () => {
        setIsLoading(true);
        try {
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                redirect: "if_required"
            });
            if (paymentIntent.status === "succeeded") return { success: true }

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [stripe, elements]);

    return {
        submit,
        isLoading
    }
}
