import { useMemo } from "react";
import PaymentsWrapper from "../components/PaymentsWrapper";

export default (Component) => (props) => {
    const options = useMemo(() => ({ clientSecret: props.clientSecret }), [props.clientSecret]);
    return (
        <PaymentsWrapper options={options}>
            <Component {...props} />
        </PaymentsWrapper>
    )
}

