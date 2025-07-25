import { useCallback, useMemo } from 'react';
import Button from 'modules/Core/sub-modules/ui-kit/components/Button';
import { useIsOpen } from 'modules/Core/hooks/useIsOpen';
import EntryForm from '../EntryForm';
import strappedConnected from 'modules/Core/higher-order-components/strappedConnected';
import feed from 'modules/entries/state/feed';
import styles from "./styles.module.scss";

const EditEntryButton = ({ onSuccess, values, entryId, initialState }) => {
    const { open, close, isOpen } = useIsOpen();
    return (
        <>
            <Button className={styles.button} onClick={open}>
                Edit Entry
            </Button>
            <EntryForm
                title="Edit Entry"
                entryId={entryId}
                onSuccess={onSuccess}
                initialState={initialState}
                isOpen={isOpen}
                close={close}
            />
        </>
    )
}

export default strappedConnected(
    EditEntryButton,
    {
        entry: (state, { entryId }) => feed.cells.fetchEntity.selector(entryId)(state),
    },
    {
        refetch: feed.cells.fetchEntity.action
    },
    ({ entryId, refetch, entry }) => ({
        initialState: useMemo(() => ({
            name: entry?.name,
            text: entry?.text,
        }), [entry?.id, entry?.name, entry?.text]),
        onSuccess: useCallback(() => refetch({ id: entryId }), [refetch, entryId])
    })
);