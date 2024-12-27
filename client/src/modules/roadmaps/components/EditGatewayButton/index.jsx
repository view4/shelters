import Button from 'modules/Core/components/ui-kit/Button';
import { useIsOpen } from 'modules/Core/hooks/useIsOpen';
import GatewayForm from '../GatewayForm';
import styles from "./styles.module.scss";

const EditGatewayButton = ({  onSuccess, gatewayId, values }) => {
    const { open, close, isOpen } = useIsOpen();
    return (
        <>
            <Button className={styles.button} onClick={open}>
                Edit Gateway 
            </Button>
            <GatewayForm
                title="Edit Gateway"
                initialState={values}
                onSuccess={onSuccess}
                gatewayId={gatewayId}
                isOpen={isOpen}
                close={close}
            />
        </>
    )
}

export default EditGatewayButton;