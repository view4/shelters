import Card from 'modules/Core/components/ui-kit/Card';
import PaymentElement from '../PaymentElement';

const PaymentCard = ({ clientSecret,header, className, options={} }) => {

    return (
        <Card header={header} className={className}>
            <PaymentElement
                clientSecret={clientSecret}
                options={options}
            />
        </Card>
    )
};

export default PaymentCard;