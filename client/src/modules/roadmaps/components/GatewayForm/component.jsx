import Modal from 'modules/Core/components/ui-kit/Modal';
import SchemaForm from "modules/Core/components/form/Form/SchemaForm";
import Title from 'modules/Core/components/ui-kit/Title';
import Container from 'modules/Core/components/ui-kit/Container';
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



export default ({ isOpen, close, schema, title = "Add Gateway", onSelectGateway, onSubmit, initialState }) => {

    const tabs = useMemo(() => ([{
        title: "Gateway Form",
        Component: () => <SchemaForm schema={schema} initialState={initialState} onSubmit={onSubmit} />
    }, {
        title: "Gateways",
        Component: () =>  withFocusedBoothId(CyclelessFeed)({ onSelect: onSelectGateway })
    }]), [initialState]);

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