import Button from 'modules/Core/components/ui-kit/Button';
import { useIsOpen } from 'modules/Core/hooks/useIsOpen';
import GatewayForm from '../GatewayForm';
import styles from "./styles.module.scss";

const AddGatewayButton = ({roadmapId, onSuccess}) => {
    const { open, close, isOpen } = useIsOpen();
    return (
        <>
            <Button className={styles.button} onClick={open}>
                Add Gateway
            </Button>
            <GatewayForm 
                onSuccess={onSuccess} 
                parentId={roadmapId} 
                isOpen={isOpen} 
                close={close} 
            />
        </>
    )
}

export default AddGatewayButton;