import Button from 'modules/Core/sub-modules/ui-kit/components/Button';
import { useIsOpen } from 'modules/Core/hooks/useIsOpen';
import CreateInvitationModal from '../CreateInvitationModal';
import styles from "./styles.module.scss";

const CreateInvitationButton = ({ text = "Invite Person", }) => {
    const { open, close, isOpen } = useIsOpen();
    return (
        <>
            <Button className={styles.button} onClick={open}>
                {text}
            </Button>
            <CreateInvitationModal
                isOpen={isOpen}
                close={close}
            />
        </>
    )
}

export default CreateInvitationButton;