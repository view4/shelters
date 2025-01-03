import Button from 'modules/Core/components/ui-kit/Button';
import { useIsOpen } from 'modules/Core/hooks/useIsOpen';
import styles from "./styles.module.scss";
import Modal from 'modules/Core/components/ui-kit/Modal';
import SchemaForm from 'modules/Core/components/form/Form/SchemaForm';
import { BOOTH_SCHEMA } from '../screens/CreateBoothScreen';
import withFocusedBoothId from 'modules/booths/higher-order-components/withFocusedBoothId';
import strappedConnected from 'modules/Core/higher-order-components/strappedConnected';

const EditBoothButton = ({ isOpen, open, close, text = "+", id, onSubmit }) => (
    <>
        <Button className={styles.button} onClick={open}>
            {text}
        </Button>
        <Modal
            isOpen={isOpen}
            onClose={close}
            title="Edit Booth"
        >
            <SchemaForm
                schema={BOOTH_SCHEMA}
                onSubmit={onSubmit}
            />

        </Modal>

    </>
)


export default withFocusedBoothId(strappedConnected(
    EditBoothButton,
    {},
    {
        onSubmit: (input, id, callback) => feed.cells.create.action({ id, input, callback })
    },
    ({ boothId, onSubmit }) => {
        const { open, close, isOpen } = useIsOpen();
        return {
            onSubmit: (input) => onSubmit(input, boothId, close),
            open, isOpen, close
        }
    }
));