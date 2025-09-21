import { useEffect, useState } from "react";
import { debounce } from "lodash";
import withFocusedBoothId from "modules/booths/higher-order-components/withFocusedBoothId";
import Card from "modules/Core/sub-modules/ui-kit/components/Card";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import AddEntryButton from "modules/entries/components/AddEntryButton";
import EntriesFeed from "modules/entries/components/EntriesFeed";
import Input from "modules/Core/sub-modules/ui-kit/components/Input";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import feed from "modules/entries/state/feed";
import ExpandableOptions from "modules/Core/sub-modules/ui-kit/components/ExpandableOptions";
import styles from "./styles.module.scss";

export const SearchComponent = strappedConnected(
    ({ value, onChange, className }) => (<>
        <Input
            value={value}
            onChange={onChange}
            placeholder="Search entries"
            className={className}
        />
    </>),
    {},
    { setFilters: feed.cells.setFilters.action },
    ({ setFilters, }) => {
        const [search, setSearch] = useState("");

        // handle update filters with debounce so updating once every second 
        useEffect(() => {
            const updateFilters = debounce(() => {
                setFilters({ search, shouldRefetch: true });
            }, 1000);

            updateFilters();
            return () => updateFilters.cancel();
        }, [search]);
        return {
            value: search,
            onChange: setSearch
        }
    }
)

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