import Button from 'modules/Core/components/ui-kit/Button';
import { useIsOpen } from 'modules/Core/hooks/useIsOpen';
import GatewayForm from '../GatewayForm';
import styles from "./styles.module.scss";

const AddGatewayButton = ({parentId, onSuccess, parentName, refetchId}) => {
    const { open, close, isOpen } = useIsOpen();
    return (
        <>
            <Button className={styles.button} onClick={open}>
                Add Gateway
            </Button>
            <GatewayForm 
                onSuccess={onSuccess} 
                parentId={parentId} 
                parentName={parentName}
                isOpen={isOpen} 
                close={close} 
                refetchId={refetchId}
            />
        </>
    )
}

export default AddGatewayButton;