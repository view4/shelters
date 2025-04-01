import Button from 'modules/Core/components/ui-kit/Button';
import { useIsOpen } from 'modules/Core/hooks/useIsOpen';
import styles from "./styles.module.scss";
import ScheduleTimeForm from '../ScheduleTimeForm';

const ScheduleTimeButton = ({ boothId, text = "+", id }) => {
    const { open, close, isOpen } = useIsOpen();
    return (
        <>
            <Button className={styles.button} onClick={open}>
                {text}
            </Button>
            <ScheduleTimeForm
                id={id}
                boothId={boothId}
                isOpen={isOpen}
                close={close}
            />
        </>
    )
}

export default ScheduleTimeButton;