import Button from 'modules/Core/components/ui-kit/Button';
import { useIsOpen } from 'modules/Core/hooks/useIsOpen';
import GatewayForm from '../GatewayForm';
import styles from "./styles.module.scss";
import strapped from 'modules/Core/higher-order-components/strapped';
import { useMemo } from 'react';

const EditGatewayButton = ({ onSuccess, gatewayId, entity }) => {
    const { open, close, isOpen } = useIsOpen();
    return (
        <>
            <Button className={styles.button} onClick={open}>
                Edit Gateway
            </Button>
            <GatewayForm
                title="Edit Gateway"
                initialState={entity}
                onSuccess={onSuccess}
                gatewayId={gatewayId}
                isOpen={isOpen}
                close={close}
            />
        </>
    )
}

export default strapped(EditGatewayButton, ({ name, text, parent,}) => ({
    entity: useMemo(() => ({
        name, text, parent
    }), [name, text, parent])
}));