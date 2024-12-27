import Button from 'modules/Core/components/ui-kit/Button';
import { useIsOpen } from 'modules/Core/hooks/useIsOpen';
import Modal from '../../Modal';
import Container from '../../Container';
import Title from '../../Title';
import Text from '../../Text';
import styles from './styles.module.scss';

const ModalButton = ({ text, onConfirm, copy, modal, ...props }) => {
    const { isOpen, open, close } = useIsOpen()
    return (
        <>
            <Button text={text} {...props}  onClick={open} />
            <Modal isOpen={isOpen} onClose={close}>
                <Container className={styles.contentContainer}>
                    <Container>
                        <Title>
                            {copy?.title ?? 'Are you sure?'}
                        </Title>
                        <Text>
                            {copy?.description ?? "This action cannot be undone, please confirm if you'd like to proceed."}
                        </Text>
                    </Container>
                    <Container flex spaceEvenly className={styles.actionsContainer}>
                        <Button text={copy?.onCancel ?? 'Cancel'} onClick={close} />
                        <Button text={copy?.onConfirm ?? 'Confirm'} onClick={() => onConfirm(close)} />
                    </Container>
                </Container>
            </Modal>
        </>
    )
}

export default ModalButton;