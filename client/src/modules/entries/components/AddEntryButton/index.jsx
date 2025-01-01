import Button from 'modules/Core/components/ui-kit/Button';
import { useIsOpen } from 'modules/Core/hooks/useIsOpen';
import styles from "./styles.module.scss";
import EntryForm from '../EntryForm';

const AddEntryButton = ({onSuccess}) => {
    const { open, close, isOpen } = useIsOpen();
    return (
        <>
            <Button className={styles.button} onClick={open}>
                Add Entry
            </Button>
            <EntryForm 
                onSuccess={onSuccess} 
                isOpen={isOpen} 
                close={close} 
            />
        </>
    )
}

export default AddEntryButton;