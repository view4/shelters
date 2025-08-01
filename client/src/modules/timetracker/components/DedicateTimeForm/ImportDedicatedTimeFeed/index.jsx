import c from 'classnames';
import Container from 'modules/Core/sub-modules/ui-kit/components/Container';
import { useCallback, useMemo, useState } from 'react';
import Button from 'modules/Core/sub-modules/ui-kit/components/Button';
import Feed from 'modules/Core/components/Feed';
import middleware from 'modules/timetracker/middleware';
import { useOnLoad } from 'modules/Core/hooks/useOnLoad';
import { FeedItemComponent } from '../../DedicatedTimeFeed';
import Tag from 'modules/Core/sub-modules/ui-kit/components/Tag';
import styles from "./styles.module.scss";

// Component wrapper to add click-to-select functionality and booth name display
const SelectableDedicatedTimeFeedItem = ({ onToggleSelect, selectedItem, ...props }) => {
    const isSelected = selectedItem?.id === props.id;

    const mockBoothNames = [
        "Learning & Development",
        "Creative Projects",
        "Health & Wellness",
        "Personal Growth",
        "Work & Career"
    ];
    const boothIndex = props.id ? parseInt(props.id.slice(-1), 16) % mockBoothNames.length : 0;
    const mockBoothName = mockBoothNames[boothIndex];

    const handleClick = () => {
        onToggleSelect(props);
    };

    const className = c(styles.feedItem, styles.selectableFeedItem, {
        [styles.selectedFeedItem]: isSelected
    });

    const headerChildren = useMemo(() => (
        <Container className={styles.boothTag}>
            <Tag
                text={`from ${mockBoothName}`}
                nature="bordered-ocean-blue"
                size="sm"
            />
        </Container>
    ), [mockBoothName]);

    return (
        <FeedItemComponent
            {...props}
            className={className}
            onClick={handleClick}
            // headerChildren={headerChildren}
        />
    );
};

// Create ImportDedicatedTimeFeed component 
const ImportDedicatedTimeFeed = ({ onSelect, boothId }) => {
    const [feedItems, setFeedItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    const onLoad = useCallback(async () => {
        const res = await middleware.ops.fetchFeed({ parentId: null });

        const unfulfilled = res?.feed?.entities?.filter(item =>
            item.boothId !== boothId &&
            item.trackedTime < item.totalMins
        ) || [];

        setFeedItems(unfulfilled);
    }, [boothId]);

    useOnLoad(onLoad, true, [boothId]);

    const handleToggleSelect = (item) => {
        setSelectedItem(prev => prev?.id === item.id ? null : item);
    };

    const handleSelect = () => {
        if (selectedItem) {
            onSelect(selectedItem?.id);
            setSelectedItem(null); // Clear selection after selecting
        }
    };

    const itemProps = useMemo(() => ({
        onToggleSelect: handleToggleSelect,
        selectedItem
    }), [selectedItem]);

    return (
        <Container flex col className={styles.feedContainer}>
            <Feed.Component
                feed={feedItems || []}
                ItemComponent={SelectableDedicatedTimeFeedItem}
                itemProps={itemProps}
            />
            <Container className={styles.selectButton} flex flexEnd>
                <Button
                    text={selectedItem ? `Select "${selectedItem.name}"` : 'Select Item'}
                    onClick={handleSelect}
                    disabled={!selectedItem}
                />
            </Container>
        </Container>
    );
};

export default ImportDedicatedTimeFeed;