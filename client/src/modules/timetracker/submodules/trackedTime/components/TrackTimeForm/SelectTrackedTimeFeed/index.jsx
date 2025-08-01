import c from 'classnames';
import Container from 'modules/Core/sub-modules/ui-kit/components/Container';
import { useMemo, useState, useCallback, useEffect } from 'react';
import Input from 'modules/Core/sub-modules/ui-kit/components/Input';
import Feed from 'modules/Core/components/Feed';
import Button from 'modules/Core/sub-modules/ui-kit/components/Button';
import { useOnLoad } from 'modules/Core/hooks/useOnLoad';
import { FeedItemComponent } from '../../TrackedTimeFeed';
import middleware from 'modules/timetracker/submodules/trackedTime/middleware';
import styles from "./styles.module.scss";

// Component wrapper to add click-to-select functionality 
const SelectableFeedItem = ({ onToggleSelect, selectedItems, ...props }) => {
    const isSelected = selectedItems?.find(item => item.id === props.id);

    const handleClick = () => {
        onToggleSelect({
            id: props.id,
            mins: props.mins,
            text: props.text,
            name: props.name
        });
    };

    const className = c(styles.feedItem, styles.selectableFeedItem, {
        [styles.selectedFeedItem]: isSelected
    });

    return (
        <FeedItemComponent {...props} className={className} onClick={handleClick} />
    );
};


// Create RetrackTimeFeed component 
const RetrackTimeFeed = ({ onSelect, boothId }) => {
    const [searchText, setSearchText] = useState('');
    const [debouncedSearchText, setDebouncedSearchText] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    // Debounce search text changes
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedSearchText(searchText);
        }, 300); // 300ms delay

        return () => clearTimeout(timeoutId);
    }, [searchText]);

    const fetchFeed = useCallback(async () => {
        const res = await middleware.ops.fetchFeed({ search: debouncedSearchText });
        setFilteredItems(res?.feed?.entities || []);
    }, [debouncedSearchText]);

    useOnLoad(fetchFeed, true, [debouncedSearchText]);

    const handleToggleSelect = (item) => {
        setSelectedItems(prev => {
            const isAlreadySelected = prev.find(selected => selected.id === item.id);
            if (isAlreadySelected) {
                return prev.filter(selected => selected.id !== item.id);
            } else {
                return [...prev, item];
            }
        });
    };

    const handleSelectAll = async () => {
        // Process each selected item individually
        for (const item of selectedItems) {
            await onSelect(item.id);
        }
        // Clear selections after processing
        setSelectedItems([]);
    };

    const itemProps = useMemo(() => ({
        onToggleSelect: handleToggleSelect,
        selectedItems
    }), [selectedItems, handleToggleSelect]);

    return (
        <Container flex col className={styles.feedContainer}>
            <Container className={styles.searchContainer}>
                <Input
                    placeholder="Search tracked times..."
                    value={searchText}
                    onChange={setSearchText}
                    className={styles.searchInput}
                />
            </Container>
            <Feed.Component
                feed={filteredItems || []}
                ItemComponent={SelectableFeedItem}
                itemProps={itemProps}
            />
            <Container className={styles.selectButton} flex flexEnd>
                <Button
                    text={selectedItems.length > 0 ? `Select ${selectedItems.length} Item${selectedItems.length === 1 ? '' : 's'}` : 'Select Items'}
                    onClick={handleSelectAll}
                    disabled={selectedItems.length === 0}
                />
            </Container>
        </Container>
    );
};

export default RetrackTimeFeed;