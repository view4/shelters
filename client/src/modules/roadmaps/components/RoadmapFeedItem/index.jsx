import { useCallback } from "react";
import cx from "classnames";
import ExpandableFeedItem from "modules/Core/components/Feed/ExpandableFeedItem";
import Container from "modules/Core/components/ui-kit/Container";
import Text from "modules/Core/components/ui-kit/Text";
import AddGatewayButton from "../AddGatewayButton";
import Feed from "modules/Core/components/Feed";
import AddGatewayToCycleButton from "../AddGatewayToCycleButton";
import ExpandableOptions from "modules/Core/components/ui-kit/ExpandableOptions";
import EditGatewayButton from "../EditGatewayButton";
import ViewRoadmapButton from "../ViewRoadmapButton";
import StampGatewayButton from "../StampGatewayButton";
import { STAMPS } from "modules/Core/consts";
import Stamps from "modules/Core/components/ui-kit/Stamps";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import feed from "modules/roadmaps/state/feed";
import styles from "./styles.module.scss";


export const GatewayExpandableOptions = ({ name, id, text, stamps, refetchGateway, refetchId, parentName, view = true }) => (
    <ExpandableOptions
        horizontal
        className={styles.options}
        options={[
            { Component: EditGatewayButton, props: { gatewayId: id, name, text, parentName } },
            { Component: AddGatewayToCycleButton, props: { gatewayId: id } },
            view && ({ Component: ViewRoadmapButton, props: { id, className: styles.viewBtn } }),
            { Component: AddGatewayButton, props: { parentId: id, parentName: name, refetchId } },
            { Component: StampGatewayButton, props: { stampKey: STAMPS.COMMENCED, gatewayId: id, shouldRender: !stamps?.[STAMPS.COMMENCED], text: "stamp commenced", callback: refetchGateway } },
            { Component: StampGatewayButton, props: { stampKey: STAMPS.COMPLETED, gatewayId: id, text: "stamp completed", shouldRender: !stamps?.[STAMPS.COMPLETED] && Boolean(stamps?.[STAMPS.COMMENCED]), callback: refetchGateway } }
        ]}
    />
)

const RoadmapFeedItem = ({ text, name, stamps, children, id, parentId, refetchGateway, className, parent, parentName, }) => (
    <ExpandableFeedItem
        className={cx(styles.container, className)}
        name={name}
        size={"xlg"}
    >
        <Container flex flexEnd>
            <GatewayExpandableOptions
                name={name}
                id={id}
                text={text}
                parentName={parent?.name ?? parentName}
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
                feed={children}
                ItemComponent={RoadmapFeedItem}
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