import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Modal from "modules/Core/sub-modules/ui-kit/components/Modal";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import languages from "../../consts/languages";
import Input from "modules/Core/sub-modules/ui-kit/components/Input";
import styles from "./styles.module.scss"

const DefaultLanguageModal = ({isOpen, close, setLanguage, language}) => {
    const handleSetLanguage = (val) => {
        setLanguage(val)
        close()
    }
    return (
        <Modal isOpen={isOpen} onClose={close}>
            <Container className={styles.container}>
                <Title>Set Default Language</Title>
                <Container className={styles.inputContainer}>
                    <Input 
                        selection={languages} 
                        onChange={handleSetLanguage} 
                        value={language ?? "en"} 
                    />
                </Container>
            </Container>
        </Modal>
    )
}

export default DefaultLanguageModal