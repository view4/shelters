import Button from 'modules/Core/components/ui-kit/Button';
import { useIsOpen } from 'modules/Core/hooks/useIsOpen';
import DedicateTimeForm from '../DedicateTimeForm';
import styles from "./styles.module.scss";

const AllocateTimeButton = ({ parentId, text = "+", id }) => {
    const { open, close, isOpen } = useIsOpen();
    return (
        <>
            <Button className={styles.button} onClick={open}>
                {text}
            </Button>
            <DedicateTimeForm
                id={id}
                parentId={parentId}
                isOpen={isOpen}
                close={close}
            />
        </>
    )
}

export default AllocateTimeButton;