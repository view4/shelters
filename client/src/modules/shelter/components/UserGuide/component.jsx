import c from "classnames"
import { useNavigate } from "react-router-dom"
import ShelterImage from "modules/shelter/assets/shelter.png";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import Modal from "modules/Core/sub-modules/ui-kit/components/Modal";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";
import { useIsOpen } from "modules/Core/hooks/useIsOpen"
import styles from "./styles.module.scss";


export const CreateBoothModal = () => {
    const navigate = useNavigate();
    const { isOpen, open, close } = useIsOpen(true);
    return (
        <Modal isOpen={true}>
            <Container className={styles.modalContent}>
                <Title className={styles.modalTitle}>Create Your First Booth</Title>
                <Container className={styles.imageContainer}>
                    <img className={styles.emptyImage} src={ShelterImage} alt="Shelter" />
                </Container>
                <Text className={styles.emptyText}>Create your first booth to get started.</Text>
                <Button
                    className={styles.createButton}
                    text="Create Booth"
                    nature="ocean-blue"
                    onClick={() => navigate("/booths/create")}
                />
            </Container>
        </Modal>
    )
}

export const BoothRequiredModal = () => {
    const navigate = useNavigate();
    return (
        <Modal isOpen={true}>
            <Container className={styles.modalContent}>
                <Title className={styles.modalTitle}>Activate a Booth</Title>
                <Container className={styles.imageContainer}>
                    <img className={styles.emptyImage} src={ShelterImage} alt="Shelter" />
                </Container>
                <Text className={styles.emptyText}>
                    You need to be associated with a booth to utilise booth tools and features.
                </Text>
                <Text className={c(styles.emptyText, styles.subText)}>
                    You can activate a booth to set as your default booth for usage.
                </Text>
                <Button
                    className={styles.createButton}
                    text="View Booths"
                    nature="ocean-blue"
                    onClick={() => navigate("/booths")}
                />
            </Container>
        </Modal>
    )
}


export const UserGuide = ({ mainText, subText, onClose }) => {
    const { isOpen, open, close } = useIsOpen(true);
    return isOpen && mainText && (
        <Container className={styles.userGuide}>
            <Container className={styles.guideContent}>
                <Container className={styles.guideHeader}>
                    <Text className={styles.guideMainText}>{mainText}</Text>
                    <Button
                        className={styles.closeButton}
                        text="×"
                        onClick={close}
                    />
                </Container>
                {subText && (
                    <Text className={styles.guideSubText}>{subText}</Text>
                )}
            </Container>
        </Container>
    );
};