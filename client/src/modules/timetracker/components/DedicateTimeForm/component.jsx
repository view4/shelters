import Modal from 'modules/Core/sub-modules/ui-kit/components/Modal';
import SchemaForm from "modules/Core/components/form/Form/SchemaForm";
import Title from 'modules/Core/sub-modules/ui-kit/components/Title';
import Container from 'modules/Core/sub-modules/ui-kit/components/Container';
import useTabs from 'modules/Core/hooks/useTabs';
import { useCallback, useMemo, useState } from 'react';
import Button from 'modules/Core/sub-modules/ui-kit/components/Button';
import Card from 'modules/Core/sub-modules/ui-kit/components/Card';
import Feed from 'modules/Core/components/Feed';
import withFocusedBoothId from "modules/booths/higher-order-components/withFocusedBoothId";
import middleware from 'modules/timetracker/middleware';
import { useOnLoad } from 'modules/Core/hooks/useOnLoad';
import { TrackedTimeFeatures } from '../DedicatedTimeFeed';
import styles from "./styles.module.scss";

// Create SelectableDedicatedTimeFeedItem component
const SelectableDedicatedTimeFeedItem = ({ onSelect, ...props }) => {
    const { id, name, trackedTime, mins, totalMins, children } = props;
    
    return (
        <Card
            className={styles.container}
            header={name}
            headerProps={{
                children: (
                    <Container>
                        <Button onClick={() => onSelect(props)}>
                            Select
                        </Button>
                    </Container>
                ),
                className: styles.header
            }}
        >
            <TrackedTimeFeatures trackedTime={trackedTime} totalMins={totalMins} />
        </Card>
    );
};

// Create ImportDedicatedTimeFeed component 
const ImportDedicatedTimeFeed = ({ onSelect, boothId }) => {
    const [feedItems, setFeedItems] = useState([]);
    
    const onLoad = useCallback(async () => {
        const res = await middleware.ops.fetchFeed({ parentId: null });
        
        const unfulfilled = res?.feed?.entities?.filter(item => 
            item.boothId !== boothId && // from other booths
            item.trackedTime < item.totalMins // unfulfilled
        ) || [];    
        
        setFeedItems(unfulfilled);
    }, [boothId]);
    
    useOnLoad(onLoad, [boothId]);
    
    const itemProps = useMemo(() => ({ onSelect }), [onSelect]);
    
    return (
        <Feed.Component 
            feed={feedItems} 
            ItemComponent={SelectableDedicatedTimeFeedItem} 
            itemProps={itemProps} 
        />
    );
};

export default ({ close, isOpen, schema, onSubmit, initialState, title = "Dedicate Time", onImport }) => {
    const tabs = useMemo(() => ([{
        title: "Dedicate Time Form",
        Component: () => <SchemaForm schema={schema} initialState={initialState} onSubmit={onSubmit} />
    }, {
        title: "Import Dedicated Time",
        Component: () => withFocusedBoothId(ImportDedicatedTimeFeed)({ onSelect: onImport })
    }]), [schema, initialState, onSubmit, onImport]);

    const { header, content } = useTabs(tabs);

    return (
        <Modal isOpen={isOpen} onClose={close}>
            <Container p1>
                <Title text={title} />
                {onImport && header}
            </Container>
            <Container className={styles.contentContainer}>
                {content}
            </Container>
        </Modal>
    );
}
