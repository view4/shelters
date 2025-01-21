import Button from 'modules/Core/components/ui-kit/Button';
import { useIsOpen } from 'modules/Core/hooks/useIsOpen';
import styles from "./styles.module.scss";
import TrackTimeForm from '../TrackTimeForm';

const TrackTimeButton = ({ dedicatedTimeId, initialState, id,  dedicatedTimeName, onSuccess, text = "+" }) => {
    const { open, close, isOpen } = useIsOpen();
    return (
        <>
            <Button className={styles.button} onClick={open}>
                {text}
            </Button>
            <TrackTimeForm
                dedicatedTimeId={dedicatedTimeId}
                initialState={initialState}
                id={id}
                dedicatedTimeName={dedicatedTimeName}
                onSuccess={onSuccess}
                isOpen={isOpen}
                close={close}
            />
        </>
    )
}

export default TrackTimeButton;