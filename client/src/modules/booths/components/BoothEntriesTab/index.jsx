import withFocusedBoothId from "modules/booths/higher-order-components/withFocusedBoothId";
import Container from "modules/Core/components/ui-kit/Container";
import AddEntryButton from "modules/entries/components/AddEntryButton";
import EntriesFeed from "modules/entries/components/EntriesFeed";

const BoothEntriesTab = ({ boothId, }) => {
    return (
        <Container flex col>sm
            <EntriesFeed boothId={boothId} />
            <Container>
                <AddEntryButton boothId={boothId} />
            </Container>
        </Container>
    )
};

export default withFocusedBoothId(BoothEntriesTab);