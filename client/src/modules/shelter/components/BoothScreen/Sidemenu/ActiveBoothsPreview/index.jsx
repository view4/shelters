import cx from "classnames";
import Container from "modules/Core/components/ui-kit/Container";
import Card from "modules/Core/components/ui-kit/Card";
import Title from "modules/Core/components/ui-kit/Title";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import feed from "modules/booths/state/feed";
import cells from "modules/booths/state";
import Stamp from "modules/Core/components/ui-kit/Stamp";
import { useNavigate } from "react-router-dom";
import { useOnLoad } from "modules/Core/hooks/useOnLoad";
import Popover from "modules/Core/components/ui-kit/Popover";
import styles from "./styles.module.scss";
import { useCallback, useState, useRef } from "react";
import { Visibility, OpenInNew } from "modules/Core/components/ui-kit/indicators";
import Modal from "modules/Core/components/ui-kit/Modal";

const ActiveBoothsPreview = ({ activeBooths, onBoothClick, isOpen, containerElement, onClose }) => {
    const [previewBooth, setPreviewBooth] = useState(null);
    const previewTimeoutRef = useRef(null);

    const handlePreviewHover = (booth) => {
        previewTimeoutRef.current = setTimeout(() => {
            setPreviewBooth(booth);
        }, 2000);
    };

    const handlePreviewLeave = () => {
        if (!previewBooth && previewTimeoutRef.current) return clearTimeout(previewTimeoutRef.current);
    };

    const handleOpenNewTab = (boothId) => {
        window.open(`/booths/${boothId}`, '_blank');
    };

    return (
        <>
            <Popover
                onClose={onClose}
                className={styles.popover}
                bodyClassName={styles.popoverBody}
                verticalOrigin="middle"
                horizontalOrigin="left"
                isOpen={isOpen}
                anchorElement={containerElement}
                placement="bottom-start"
                BackdropComponent={() => null}
            >
                <Container onMouseLeave={onClose} className={styles.previewContainer}>
                    <Container className={styles.boothsContainer} mb3>
                        {activeBooths?.map(booth => (
                            <Card
                                key={booth.id}
                                className={cx(styles.boothCard, { [styles.focused]: booth.isFocused })}
                                onClick={() => onBoothClick(booth)}
                                onMouseEnter={() => handlePreviewHover(booth)}
                                onMouseLeave={handlePreviewLeave}
                                lightShadow
                            >
                                <Container maxWidth fullHeight flex alignCenter spaceBetween className={styles.boothContent}>
                                    <Title className={styles.boothName}>{booth.name}</Title>
                                    <Container className={styles.boothInfo}>
                                        <Stamp timestamp={booth.stamps?.commenced} />
                                        {booth.stamps?.focused && <Stamp timestamp={booth.stamps?.focused} />}
                                        <Container className={styles.actions}>
                                            {/* <Visibility
                                                className={styles.actionIcon}
                                                onMouseEnter={() => handlePreviewHover(booth)}
                                                onMouseLeave={handlePreviewLeave}
                                            /> */}
                                            <OpenInNew
                                                className={styles.actionIcon}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleOpenNewTab(booth.id);
                                                }}
                                            />
                                        </Container>
                                    </Container>
                                </Container>
                            </Card>
                        ))}
                    </Container>
                </Container>
            </Popover>
            <Modal
                isOpen={Boolean(previewBooth)}
                onClose={() => setPreviewBooth(null)}
                bodyClassName={styles.previewModal}
            >
                {previewBooth && (
                    <iframe
                        src={`/booths/${previewBooth.id}`}
                        className={styles.previewFrame}
                        title={`Preview of ${previewBooth.name}`}
                    />
                )}
            </Modal>
        </>
    );
};

export default strappedConnected(
    ActiveBoothsPreview,
    {
        activeBooths: (state) => state.booths.activeBooths,
    },
    {
        onFocusBooth: (id) => feed.cells.stampEntity.action({ key: 'focused', id }),
        refetchFocusedBooth: cells.fetchFocusedBooth.action,
        fetchActiveBooths: cells.fetchActiveBooths.action
    },
    ({ onFocusBooth, activeBooths, refetchFocusedBooth, fetchActiveBooths }) => {
        const navigate = useNavigate();

        useOnLoad(() => {
            fetchActiveBooths()
        }, Boolean(!activeBooths?.length), [activeBooths?.length]);

        const onBoothClick = useCallback((booth) => {
            onFocusBooth(booth.id);
            fetchActiveBooths();
            refetchFocusedBooth();
            navigate('/')
            window.location.reload();
        }, [onFocusBooth, fetchActiveBooths, refetchFocusedBooth, navigate])

        return {
            onBoothClick
        };
    }
); 