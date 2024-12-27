import Container from "modules/Core/components/ui-kit/Container"
import Modal from "modules/Core/components/ui-kit/Modal"
import Title from "modules/Core/components/ui-kit/Title"
import Text from "modules/Core/components/ui-kit/Text";
import styles from "./styles.module.scss"
import useResponsiveness from "modules/Core/hooks/useResponsiveness";

const MobileModal = () => {
    const isMobile = useResponsiveness()
    return isMobile && (
        <Modal
            isOpen
        >
            <Container className={styles.contentContainer} flex col >
                <Container mt3 flex center alignCenter>

                    <Title>
                        Unfortunately, we do not currently support mobile!
                    </Title>
                </Container>
                <Container flex center alignCenter mt3>
                    <Text>
                        We hope to support mobile devices soon, but due to limited resources we haven't got to it yet.
                        In the meantime, please visit us on a laptop or desktop device.
                    </Text>
                </Container>

            </Container>
        </Modal>
    )
};

export default MobileModal;