import Button from 'modules/Core/components/ui-kit/Button';
import { useIsOpen } from 'modules/Core/hooks/useIsOpen';
import DedicateTimeForm from '../DedicateTimeForm';
import styles from "./styles.module.scss";
const AllocateTimeButton = () => {
    const { open, close, isOpen } = useIsOpen();
    return (
        <>
            <Button  className={styles.button} onClick={open}>
                +
            </Button>
            <DedicateTimeForm isOpen={isOpen} close={close} />
        </>
    )
}

export default AllocateTimeButton;