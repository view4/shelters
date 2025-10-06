import Modal from 'modules/Core/sub-modules/ui-kit/components/Modal';
import SchemaForm from "modules/Core/components/form/Form/SchemaForm";
import Title from 'modules/Core/sub-modules/ui-kit/components/Title';
import Container from 'modules/Core/sub-modules/ui-kit/components/Container';
import useTabs from 'modules/Core/hooks/useTabs';
import { useCallback, useMemo, useState } from 'react';
import { SelectableGatewayFeedItem } from "../RoadmapFeedItem"

import withFocusedBoothId from "modules/booths/higher-order-components/withFocusedBoothId"
import middleware from 'modules/roadmaps/middleware';
import { useOnLoad } from 'modules/Core/hooks/useOnLoad';
import Feed from 'modules/Core/components/Feed';
import styles from "./styles.module.scss";

const CyclelessFeed = ({onSelect, boothId}) => {
    const [feedItems, setFeedItems] = useState([]) 
    const onLoad = useCallback(async () => {
        const res = await middleware.ops.fetchFeed({ boothId, isCycleless: true })
        setFeedItems(res?.feed?.entities)
    })
    useOnLoad(onLoad, [boothId])
    const itemProps = useMemo(() => ({ onSelect }), [onSelect])
    return <Feed.Component feed={feedItems} ItemComponent={SelectableGatewayFeedItem} itemProps={itemProps} />
}



export default ({ isOpen, close, schema, title , onSelectGateway, onSubmit, initialState }) => {

    const tabs = useMemo(() => ([{
        title: "Create New",
        Component: () => <SchemaForm schema={schema} initialState={initialState} onSubmit={onSubmit} />
    }, {
        title: "Select Existing",
        Component: () =>  withFocusedBoothId(CyclelessFeed)({ onSelect: onSelectGateway })
    }]), [initialState, onSelectGateway, onSubmit]);

    const { header, content } = useTabs(tabs)

    return (
        <Modal isOpen={isOpen} onClose={close}>
            <Container p1 >
                <Title text={title} />
                {onSelectGateway && header}
            </Container>
            <Container className={styles.contentContainer}>
                {content}
            </Container>
        </Modal>
    )

}