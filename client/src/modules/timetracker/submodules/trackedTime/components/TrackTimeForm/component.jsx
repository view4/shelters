import Modal from 'modules/Core/sub-modules/ui-kit/components/Modal';
import SchemaForm from "modules/Core/components/form/Form/SchemaForm";
import Title from 'modules/Core/sub-modules/ui-kit/components/Title';
import Container from 'modules/Core/sub-modules/ui-kit/components/Container';
import useTabs from 'modules/Core/hooks/useTabs';
import { useCallback, useMemo, useState } from 'react';
import Input from 'modules/Core/sub-modules/ui-kit/components/Input';
import Card from 'modules/Core/sub-modules/ui-kit/components/Card';
import Feed from 'modules/Core/components/Feed';
import Features from 'modules/Core/sub-modules/ui-kit/components/Features';
import Button from 'modules/Core/sub-modules/ui-kit/components/Button';
import middleware from '../../middleware';
import { useOnLoad } from 'modules/Core/hooks/useOnLoad';
import styles from "./styles.module.scss";

const TrackedTimeFeedItem = ({ id, mins, text, createdAt, onSelect }) => (
    <Card 
        header={`${mins} minutes`}
        headerProps={{
            children: onSelect && (
                <Container>
                    <Button onClick={() => onSelect({ id, mins, text, createdAt })}>
                        Select
                    </Button>
                </Container>
            ),
            className: styles.header
        }}
        className={styles.trackedTimeItem}
    >
        <Features
            features={[
                { name: "Description", content: text },
                { name: "Duration", content: `${mins} minutes` },
                { name: "Created", content: new Date(createdAt).toLocaleDateString() }
            ]}
            featureProps={{
                flex: true,
                spaceBetween: true,
                alignCenter: true
            }}
        />
    </Card>
);

// Create RetrackTimeFeed component 
const RetrackTimeFeed = ({ onSelect }) => {
    const [feedItems, setFeedItems] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    
    const onLoad = useCallback(async () => {
        // Fetch all tracked times (without dedicatedTimeId filter)
        const res = await middleware.ops.fetchFeed({});
        setFeedItems(res?.feed?.entities || []);
    }, []);
    
    useOnLoad(onLoad, []);
    
    // Filter items based on search text
    useMemo(() => {
        if (!searchText.trim()) {
            setFilteredItems(feedItems);
        } else {
            const filtered = feedItems.filter(item => 
                item.text?.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredItems(filtered);
        }
    }, [feedItems, searchText]);

    const itemProps = useMemo(() => ({ onSelect }), [onSelect]);
    
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
                feed={filteredItems} 
                ItemComponent={TrackedTimeFeedItem}
                itemProps={itemProps}
            />
        </Container>
    );
};

export default ({ isOpen, close, schema, onSubmit, initialState, title = "Track Time", trackExisting }) => {
    const tabs = useMemo(() => ([{
        title: "Track Time Form",
        Component: () => <SchemaForm schema={schema} initialState={initialState} onSubmit={onSubmit} />
    }, {
        title: "Retrack Time",
        Component: () => <RetrackTimeFeed onSelect={trackExisting} />
    }]), [schema, initialState, onSubmit, trackExisting]);

    const { header, content } = useTabs(tabs);

    return (
        <Modal isOpen={isOpen} onClose={close}>
            <Container p1>
                <Title text={title} />
                {trackExisting && header}
            </Container>
            <Container className={styles.contentContainer}>
                {content}
            </Container>
        </Modal>
    );
};