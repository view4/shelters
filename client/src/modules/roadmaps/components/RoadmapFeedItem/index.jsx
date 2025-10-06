import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
import { Completed, CrossHairs, DottedCrossHairs } from "modules/Core/sub-modules/ui-kit/components/indicators";
import styles from "./styles.module.scss";


export const GatewayExpandableOptions = ({ name, id, text, stamps, refetchGateway, refetchId, parent, view = true }) => (
    <ExpandableOptions
        horizontal
        className={styles.options}
        options={[
            { Component: EditGatewayButton, props: { gatewayId: id, text: "Edit", entity: { name, text, parent } } },
            { Component: AddGatewayToCycleButton, props: { gatewayId: id } },
            view && ({ Component: ViewRoadmapButton, props: { id, className: styles.viewBtn } }),
            { Component: AddGatewayButton, props: { parentId: id, parentName: name, refetchId, text: "Add Step" } },
            { Component: StampGatewayButton, props: { stampKey: STAMPS.COMMENCED, gatewayId: id, shouldRender: !stamps?.[STAMPS.COMMENCED], text: "stamp commenced", callback: refetchGateway } },
            { Component: StampGatewayButton, props: { stampKey: STAMPS.COMPLETED, gatewayId: id, text: "stamp completed", shouldRender: !stamps?.[STAMPS.COMPLETED] && Boolean(stamps?.[STAMPS.COMMENCED]), callback: refetchGateway } }
        ]}
    />
)

export const StampIndicator = ({ stamps }) => {
    const indicator = useMemo(() => {
        if (stamps?.[STAMPS.COMMENCED] && stamps?.[STAMPS.COMPLETED]) return <Completed height={1.5} width={1.5} className={styles.completed} />
        if (stamps?.[STAMPS.COMMENCED]) return <DottedCrossHairs height={1.5} width={1.5} className={styles.dottedCrossHairs} />
        return <CrossHairs height={1.5} width={1.5} className={styles.crossHairs} />;
    }, [stamps])
    return <Container flex alignCenter className={styles.stampIndicator}>
        {indicator}
    </Container>
}

export const TitleWithStamps = ({ title, stamps, className, appendage, cycle }) => {
    const nav = useNavigate();
    const onCycleClick = useCallback(() => {
        nav(`/cycles/${cycle?.id}`);
    }, [cycle, nav]);

    return (
        <Container className={cx(styles.titleContainer, className)} flex spaceBetween maxWidth>
            <Title className={cx(styles.title)} Element="h4">{title}</Title>
            <Container flex alignCenter>
                {appendage}
                <Stamps stamps={[
                    stamps?.[STAMPS.COMMENCED] && { stamp: "Commenced", timestamp: stamps?.[STAMPS.COMMENCED] },
                    stamps?.[STAMPS.COMPLETED] && { stamp: "Completed", timestamp: stamps?.[STAMPS.COMPLETED] },
                    cycle && { stamp: "Added to cycle", timestamp: null, nature: 'golden', onClick: onCycleClick }
                ]} />
            </Container>
        </Container>
    )
}

const RoadmapFeedItem = ({ text, name, stamps, cycle, TitleComponent = TitleWithStamps, children, childrenIds, id, parentId, refetchGateway, className, parent, parentName, headerChildren }) => (
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
        label={<TitleComponent title={name} stamps={stamps} parent={parent} cycle={cycle} />}
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
    { gateway: (state, { id }) => feed.cells.fetchEntity.selector(id)(state) },
    {
        refetchGateway: (id) => feed.cells.fetchEntity.action({ id }),
    },
    ({ gateway, refetchGateway, parent, parentId }) => ({
        text: gateway?.text,
        name: gateway?.name,
        stamps: gateway?.stamps,
        childrenIds: gateway?.childrenIds,
        cycle: gateway?.cycle,
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