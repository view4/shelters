import Button from 'modules/Core/sub-modules/ui-kit/components/Button';
import { useIsOpen } from 'modules/Core/hooks/useIsOpen';
import CreateInvitationLinkModal from '../CreateInvitationLinkModal';
import styles from "./styles.module.scss";

const CreateInvitationLinkButton = ({ text = "Create Invitation Link" }) => {
    const { open, close, isOpen } = useIsOpen();
    return (
        <>
            <Button className={styles.button} onClick={open}>
                {text}
            </Button>
            <CreateInvitationLinkModal
                isOpen={isOpen}
                close={close}
            />
        </>
    )
}

export default CreateInvitationLinkButton;
