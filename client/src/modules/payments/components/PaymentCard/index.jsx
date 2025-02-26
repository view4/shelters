import Card from 'modules/Core/components/ui-kit/Card';
import PaymentElement from '../PaymentElement';

const PaymentCard = ({ clientSecret, options={} }) => {

    return (
        <Card>
            <PaymentElement
                clientSecret={clientSecret}
                options={options}
            />
        </Card>
    )
};

export default PaymentCard;