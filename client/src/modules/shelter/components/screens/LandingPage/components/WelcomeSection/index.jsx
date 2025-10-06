import c from "classnames";
import { useRef, useState } from "react";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import Popover from "modules/Core/sub-modules/ui-kit/components/Popover";
import { GENERAL_COPY, WELCOME_COPY } from "../../consts";
import ShelterImage from "modules/shelter/assets/shelter.png";
import ScrollNext from "../ScrollNext";
import styles from "./styles.module.scss";

const Asterisk = () => {
    const [isOpen, setIsOpen] = useState(false);
    const anchorRef = useRef(null);
    const closeTimeoutRef = useRef(null);

    const open = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setIsOpen(true);
    };
    const scheduleClose = () => {
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = setTimeout(() => setIsOpen(false), 500);
    };
    const cancelClose = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
    };

    return (
        <>
            <Container
                ref={anchorRef}
                className={styles.asterisk}
                onMouseEnter={open}
                onMouseLeave={scheduleClose}
                aria-label="Temporary name info"
            >
                *
            </Container>
            <Popover
                isOpen={isOpen}
                onClose={scheduleClose}
                anchorElement={anchorRef.current}
                // verticalOrigin="top"
                // horizontalOrigin="right"
                // placement="right"
                bodyClassName={styles.namePopoverBody}
                BackdropComponent={() => null}

            >
                <Container
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                    className={styles.namePopover}
                >
                    <Text className={styles.namePopoverText}>
                        {WELCOME_COPY.ASTERISK}
                    </Text>
                </Container>
            </Popover>
        </>
    )
}

const WelcomeSection = () => {
    return (
        <Container id="home" className={c(styles.section, styles.welcomeSection)}>
            <Container className={styles.contentWrapper}>
                <Container className={styles.gridContainer}>
                    {/* Left Content */}
                    <Container className={styles.leftContent}>
                        {/* Brand Name */}
                        <Title className={styles.brandTitle}>
                            {GENERAL_COPY.NAME}
                            <Asterisk />
                        </Title>

                        {/* Headline */}
                        {/* <Container  alignCenter>
                            <Title Element="h2" className={styles.headline}>
                                {WELCOME_COPY.HEADLINE}
                            </Title>
                            <Text className={styles.headlineSuffix}>{WELCOME_COPY.HEADLINE_SUFFIX}</Text>
                        </Container> */}


                        {/* Subtext */}
                        <Text className={styles.subtext}>
                            {WELCOME_COPY.SUBTEXT}
                        </Text>

                    </Container>

                    {/* Right Illustration */}
                    <Container className={styles.rightContent}>
                        <Container className={styles.illustrationWrapper}>
                            <img src={ShelterImage} alt="Shelters illustration" className={styles.illustration} />
                        </Container>
                    </Container>
                </Container>

                {/* Scroll indicator */}
                <ScrollNext toId="features" />
            </Container>
        </Container>
    );
};

export default WelcomeSection;