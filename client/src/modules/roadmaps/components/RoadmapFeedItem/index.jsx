import { useCallback } from "react";
import cx from "classnames";
import ExpandableFeedItem from "modules/Core/components/Feed/ExpandableFeedItem";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";
import AddGatewayButton from "../AddGatewayButton";
import Feed from "modules/Core/components/Feed";
import AddGatewayToCycleButton from "../AddGatewayToCycleButton";
import ExpandableOptions from "modules/Core/sub-modules/ui-kit/components/ExpandableOptions";
import EditGatewayButton from "../EditGatewayButton";
import ViewRoadmapButton from "../ViewRoadmapButton";
import StampGatewayButton from "../StampGatewayButton";
import { STAMPS } from "modules/Core/consts";
import Stamps from "modules/Core/sub-modules/ui-kit/components/Stamps";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import feed from "modules/roadmaps/state/feed";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import styles from "./styles.module.scss";


export const GatewayExpandableOptions = ({ name, id, text, stamps, refetchGateway, refetchId, parent, view = true }) => (
    <ExpandableOptions
        horizontal
        className={styles.options}
        options={[
            { Component: EditGatewayButton, props: { gatewayId: id, name, text, parent, } },
            { Component: AddGatewayToCycleButton, props: { gatewayId: id } },
            view && ({ Component: ViewRoadmapButton, props: { id, className: styles.viewBtn } }),
            { Component: AddGatewayButton, props: { parentId: id, parentName: name, refetchId } },
            { Component: StampGatewayButton, props: { stampKey: STAMPS.COMMENCED, gatewayId: id, shouldRender: !stamps?.[STAMPS.COMMENCED], text: "stamp commenced", callback: refetchGateway } },
            { Component: StampGatewayButton, props: { stampKey: STAMPS.COMPLETED, gatewayId: id, text: "stamp completed", shouldRender: !stamps?.[STAMPS.COMPLETED] && Boolean(stamps?.[STAMPS.COMMENCED]), callback: refetchGateway } }
        ]}
    />
)

export const TitleWithStamps = ({ title, stamps }) => (

    <Container flex spaceBetween maxWidth>
        <Title className={styles.title} Element="h4">{title}</Title>
        <Stamps stamps={[
            stamps?.[STAMPS.COMMENCED] && { stamp: "Commenced", timestamp: null },
            stamps?.[STAMPS.COMPLETED] && { stamp: "Completed", timestamp: null }
        ]} />

    </Container>
)

const RoadmapFeedItem = ({ text, name, stamps, children,childrenIds, id, parentId, refetchGateway, className, parent, parentName, headerChildren }) => (
    <ExpandableFeedItem
        className={cx(
            styles.container,
            className,
            {
                [styles.commenced]: Boolean(stamps?.[STAMPS.COMMENCED]),
                [styles.completed]: Boolean(stamps?.[STAMPS.COMPLETED])
            })}
        headerProps={{
            children: headerChildren
        }}
        label={<TitleWithStamps title={name} stamps={stamps} />}
        size={"xlg"}
    >
        <Container flex flexEnd>
            <GatewayExpandableOptions
                name={name}
                id={id}
                text={text}
                parent={parent}
                refetchId={parentId ?? id}
                stamps={stamps}
                refetchGateway={refetchGateway}
            />
        </Container>
        <Container className={styles.textContainer} >
            <Text p1>
                {text}
            </Text>
        </Container  >
        <Container col flex flexEnd alignCenter maxWidth>
            <Feed.Component
                feed={childrenIds?.map(id => ({ id }))}
                ItemComponent={ChildGatewayFeedItem}
                className={styles.childFeedItem}
            />
        </Container>
        <Container flex flexEnd mt1 bt1grey>
            <Container flex flexEnd mt1 fullWidth >
                <Stamps stamps={[
                    stamps?.[STAMPS.COMMENCED] && { stamp: "Commenced", timestamp: stamps?.[STAMPS.COMMENCED] },
                    stamps?.[STAMPS.COMPLETED] && { stamp: "Completed", timestamp: stamps?.[STAMPS.COMPLETED] }
                ]} />
            </Container>
        </Container>
    </ExpandableFeedItem>
);

export const SelectableGatewayFeedItem = ({ onSelect, ...props }) => (
    <RoadmapFeedItem
        {...props}
        headerChildren={
            <Container>
                <Button onClick={() => onSelect(props)}>
                    Select
                </Button>
            </Container>
        }
    />
)

export const ChildGatewayFeedItem = strappedConnected(
    RoadmapFeedItem, 
    {gateway: (state, { id }) => feed.cells.fetchEntity.selector(id)(state)},
    {
        refetchGateway: (id) => feed.cells.fetchEntity.action({ id }),
    }, 
    ({ gateway, refetchGateway, parent, parentId }) => ({
        text: gateway?.name,
        name: gateway?.name,
        stamps: gateway?.stamps,
        childrenIds: gateway?.childrenIds,
        id: gateway?.id,
        parentId: gateway?.parentId,
        refetchGateway: useCallback(() => refetchGateway(gateway?.id), [refetchGateway, gateway?.id]),
        parent: parent ?? gateway?.parentId,
        parentName: parent?.name ?? gateway?.parentName,
    })
)

export default strappedConnected(
    RoadmapFeedItem,
    {},
    {
        refetchGateway: (id) => feed.cells.fetchEntity.action({ id }),
    },
    ({ refetchGateway, id }) => ({
        refetchGateway: useCallback(() => refetchGateway(id), [refetchGateway, id])
    })
);