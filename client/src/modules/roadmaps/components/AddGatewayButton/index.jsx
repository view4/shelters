import Button from 'modules/Core/sub-modules/ui-kit/components/Button';
import { useIsOpen } from 'modules/Core/hooks/useIsOpen';
import GatewayForm from '../GatewayForm';
import styles from "./styles.module.scss";

const AddGatewayButton = ({parentId, onSuccess, parentName, onSelectGateway, refetchId}) => {
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
                onSelectGateway={onSelectGateway}
            />
        </>
    )
}

export default AddGatewayButton;