import Button from 'modules/Core/sub-modules/ui-kit/components/Button';
import { useIsOpen } from 'modules/Core/hooks/useIsOpen';
import feed from 'modules/booths/state/feed';
import styles from "./styles.module.scss";
import Modal from 'modules/Core/sub-modules/ui-kit/components/Modal';
import SchemaForm from 'modules/Core/components/form/Form/SchemaForm';
import { BOOTH_SCHEMA } from '../screens/CreateBoothScreen';
import withFocusedBoothId from 'modules/booths/higher-order-components/withFocusedBoothId';
import strappedConnected from 'modules/Core/higher-order-components/strappedConnected';
import { useMemo } from 'react';
import { onError, onSuccess } from 'modules/Core/sub-modules/Dialog/state/cells';

const EditBoothButton = ({ isOpen, open, close, text = "Edit Booth Info", id, initialState, onSubmit }) => (
    <>
        <Button className={styles.button} onClick={open}>
            {text}
        </Button>
        <Modal
            isOpen={isOpen}
            onClose={close}
            title="Edit Booth Info"
        >
            <SchemaForm
                schema={BOOTH_SCHEMA}
                onSubmit={onSubmit}
                initialState={initialState}
            />

        </Modal>

    </>
)


export default withFocusedBoothId(strappedConnected(
    EditBoothButton,
    {
        
    },
    {
        onSubmit: (input, id, callback) => feed.cells.createEntity.action({ id, input, callback }),
        onError,
        onSuccess,
        refetch: (id) => feed.cells.fetchEntity.action({id})
    },
    ({ boothId, onSubmit, booth, onError, onSuccess, refetch }) => {
        const { open, close, isOpen } = useIsOpen();
        return {
            onSubmit: (input) => onSubmit(input, boothId, ({id}) => {
                if(!id) return onError("Failed to update Booth Info");
                close()
                onSuccess("Booth Info Updated")
                refetch(id)
                return null;
            }),
            open, isOpen, close,
            initialState: useMemo(() => ({name: booth?.name, text: booth?.text}), [booth?.id])
        }
    }
));