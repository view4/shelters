import Button from 'modules/Core/components/ui-kit/Button';
import { useIsOpen } from 'modules/Core/hooks/useIsOpen';
import styles from "./styles.module.scss";
import TrackTimeForm from '../TrackTimeForm';

const TrackTimeButton = () => {
    const { open, close, isOpen } = useIsOpen();
    return (
        <>
            <Button  className={styles.button} onClick={open}>
                +
            </Button>
            <TrackTimeForm isOpen={isOpen} close={close} />
        </>
    )
}

export default TrackTimeButton;