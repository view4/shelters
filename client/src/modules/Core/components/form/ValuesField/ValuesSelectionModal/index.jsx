import { useCallback, useMemo } from "react";
import cx from "classnames";
import P4PValuesFeed from "modules/P4P/sub-modules/Values/components/P4PValuesFeed";
import useSelectedState from "modules/Core/hooks/useSelectedState";
import Modal from "modules/Core/components/ui-kit/Modal";
import Container from "modules/Core/components/ui-kit/Container";
import Title from "modules/Core/components/ui-kit/Title";
import Button from "modules/Core/components/ui-kit/Button";
import styles from './styles.module.scss';

const FeedItem = ({ getIsSelected, ...props }) => (
    <P4PValuesFeed.FeedItem  {...props} className={cx(styles.feedItem, { [styles.selected]: getIsSelected(props?.id) })} />
)

const ValuesSelectionModal = ({ isOpen, close, onSelect }) => {
    const { selected, onSelectFeedItem } = useSelectedState({});

    const getIsSelected = useCallback((id) => Boolean(selected[id]), [selected]);

    const itemProps = useMemo(() => ({
        getIsSelected,
    }), [getIsSelected, onSelectFeedItem]);

    return (
        <Modal isOpen={isOpen} onClose={close}>
            <Container className={styles.modalContent} flex col spaceBetween>
                <Container>
                    <Title Element='h4' text={'Select Values'} />
                    <Container className={styles.feedContainer}>
                        <P4PValuesFeed
                            itemProps={itemProps}
                            ItemComponent={FeedItem}
                            onClick={onSelectFeedItem}
                        />
                    </Container>
                </Container>
                <Container flex bg1 p1 spaceBetween>
                    <Button onClick={close}>Cancel</Button>
                    <Button onClick={() => onSelect(Object.values(selected ?? {}))}>Select</Button>
                </Container>
            </Container>
        </Modal>
    )
};

export default ValuesSelectionModal;
