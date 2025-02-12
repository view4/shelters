import withFocusedBoothId from "modules/booths/higher-order-components/withFocusedBoothId";
import Container from "modules/Core/components/ui-kit/Container";
import styles from "./styles.module.scss";
import CyclesFeed from "modules/cycles/components/CyclesFeed";

const BoothPastCyclesTab = ({ boothId, }) => {
    return (
        <Container className={styles.container} flex col>
            <CyclesFeed boothId={boothId} isCompleted={true} />
        </Container>
    )
};

export default withFocusedBoothId(BoothPastCyclesTab);