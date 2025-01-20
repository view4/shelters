import Button from 'modules/Core/components/ui-kit/Button';
import { useIsOpen } from 'modules/Core/hooks/useIsOpen';
import AddRoadmapForm from '../RoadmapForm';
import styles from "./styles.module.scss";

const AddRoadmapButton = ({ boothId }) => {
    const { open, close, isOpen } = useIsOpen();
    return (
        <>
            <Button className={styles.button} onClick={open}>
                +
            </Button>
            <AddRoadmapForm 
                boothId={boothId}
                isOpen={isOpen}
                close={close}
            />
        </>
    )
}

export default AddRoadmapButton;