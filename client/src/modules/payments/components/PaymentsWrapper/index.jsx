import { useMemo } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadPayments } from "modules/payments/utils";

const E = ({ promise, ...props }) => <Elements stripe={promise} {...props} />;

const PaymentsWrapper = ({ children, options }) => {
    const promise = useMemo(() => window.navigator.onLine && loadPayments(), [window.navigator.onLine]);

    if (!promise) return (
        <>
            {children}
        </>
    )
    return (
        <E promise={promise} options={options}>
            {children}
        </E>
    )
};

export default PaymentsWrapper;