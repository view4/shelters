import withFocusedBoothId from "modules/booths/higher-order-components/withFocusedBoothId";
import Card from "modules/Core/components/ui-kit/Card";
import Container from "modules/Core/components/ui-kit/Container";
import AddEntryButton from "modules/entries/components/AddEntryButton";
import EntriesFeed from "modules/entries/components/EntriesFeed";
import styles from "./styles.module.scss";

const BoothEntriesTab = ({ boothId, }) => {
    return (
        <Container className={styles.container} flex col>
            <Card className={styles.card}>
                <AddEntryButton boothId={boothId} />
            </Card>
            <EntriesFeed boothId={boothId} />

        </Container>
    )
};

export default withFocusedBoothId(BoothEntriesTab);