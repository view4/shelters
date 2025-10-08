import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import feed from "modules/roadmaps/state/feed";
import Feed from "modules/Core/components/Feed";
import { ChildGatewayFeedItem, GatewayExpandableOptions } from "../../RoadmapFeedItem";
import Card from "modules/Core/sub-modules/ui-kit/components/Card";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";
import { useOnLoad } from "modules/Core/hooks/useOnLoad";
import { STAMPS } from "modules/Core/consts";
import Stamps from "modules/Core/sub-modules/ui-kit/components/Stamps";
import BoothScreen from "modules/shelter/components/BoothScreen";
import styles from "./styles.module.scss";

const RightPanelComponent = ({ parent, gridRow }) => (
    <Container maxHeight flex col flexEnd >
        {parent?.id && <Button m1 mb3 className={styles.parentBtn} gridRow={gridRow} to={`/view-roadmap/${parent?.id}`} widget text={parent?.name} />}
    </Container>
)

const FeedCard = ({ id }) => {
    const childrenIds = useSelector(feed.cells.fetchEntity.selectField(id, 'childrenIds'));
    const name = useSelector(feed.cells.fetchEntity.selectField(id, 'name'));
    const feedItems = useMemo(() => childrenIds?.map(childId => ({
        id: childId,
        parentId: id,
        parent: { id, name: name }
    })), [childrenIds?.length, id]);

    return (
        <Card title="Roadmap Steps" lightShadow className={styles.tabsCard}>
            <Feed.Component
                feed={feedItems}
                ItemComponent={ChildGatewayFeedItem}
            />
        </Card>

    )
}


const Component = ({ name, text, id, roadmap, tabs, rightProps, childrenIds, stamps, refetch, parent }) => {


    return (
        <BoothScreen RightPanelComponent={RightPanelComponent} rightProps={rightProps}>
            <Container maxHeight>
                <Card className={styles.headerCard} maxWidth relative >
                    <Container>
                        <Title>{name}</Title>
                    </Container>
                    <Container>
                        <Text>{text}</Text>
                    </Container>
                    <Container className={styles.optionsContainer}>
                        <Container flex flexStart  >
                            <Stamps stamps={[
                                stamps?.[STAMPS.COMMENCED] && { stamp: "Commenced", timestamp: stamps?.[STAMPS.COMMENCED] },
                                stamps?.[STAMPS.COMPLETED] && { stamp: "Completed", timestamp: stamps?.[STAMPS.COMPLETED] }
                            ]} />
                        </Container>
                        <GatewayExpandableOptions
                            id={id}
                            name={name}
                            text={text}
                            stamps={stamps}
                            parentName={parent?.name}
                            view={false}
                            refetchId={id}
                            refetchGateway={refetch}
                        />
                    </Container>
                </Card>
                <FeedCard id={id} />

            </Container>
        </BoothScreen>
    )
}

export default strappedConnected(
    Component,
    {
        roadmap: (state, { id }) => feed.cells?.fetchEntity.selector(id)(state)
    },
    {
        fetchEntity: feed.cells?.fetchEntity.action,
    },
    ({ roadmap, id, fetchEntity }) => {
        useOnLoad(
            () => fetchEntity({ id }),
            true,
            [id]
        )

        return {
            name: roadmap?.name,
            text: roadmap?.text,
            parent: roadmap?.parent,
            childrenIds: roadmap?.childrenIds,
            stamps: roadmap?.stamps,
            rightProps: useMemo(() => ({
                parent: roadmap?.parent,
            }), [roadmap?.parent, id]),
            feed: feed,
            refetch: useCallback(() => fetchEntity({ id }), [fetchEntity, id]),
        }
    }
)