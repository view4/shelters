import Button from 'modules/Core/components/ui-kit/Button';
import { useIsOpen } from 'modules/Core/hooks/useIsOpen';
import EntryForm from '../EntryForm';
import strappedConnected from 'modules/Core/higher-order-components/strappedConnected';
import feed from 'modules/entries/state/feed';
import styles from "./styles.module.scss";

const AddEntryButton = ({ onSuccess, boothId }) => {
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
                boothId={boothId}
            />
        </>
    )
}

export default strappedConnected(
    AddEntryButton, 
    {}, 
    {onSuccess: () => feed.cells.fetchFeed.action({renewStream: true})},
    () => ({})
);