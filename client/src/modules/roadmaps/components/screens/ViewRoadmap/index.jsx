import { useCallback, useMemo } from "react";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import feed from "modules/roadmaps/state/feed";
import Feed from "modules/Core/components/Feed";
import RoadmapFeedItem, { ChildGatewayFeedItem, GatewayExpandableOptions } from "../../RoadmapFeedItem";
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


const Component = ({ name, text, id, tabs, rightProps, stamps, refetch, parent }) => (
    <BoothScreen RightPanelComponent={RightPanelComponent} rightProps={rightProps}>
        <Container maxHeight>
            <Card className={styles.headerCard} maxWidth relative >
                <Container>
                    <Title>{name} {id}</Title>
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
            <Card lightShadow className={styles.tabsCard} tabs={tabs} />
        </Container>
    </BoothScreen>
)

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
            !Boolean(roadmap?.id),
            [id]
        )

        const feed = useMemo(() => roadmap?.childrenIds?.map(childId => ({
            id: childId,
            parentId: id,
            parent: { id, name: roadmap?.name }
        })), [roadmap?.childrenIds?.length, id]);

        return {
            name: roadmap?.name,
            text: roadmap?.text,
            parent: roadmap?.parent,
            stamps: roadmap?.stamps,
            rightProps: useMemo(() => ({
                parent: roadmap?.parent,
            }), [roadmap?.parent, id]),
            tabs: useMemo(() => [
                {
                    title: 'Gateways',
                    Component: () => <Container>
                        <Feed.Component
                            feed={feed}
                            ItemComponent={ChildGatewayFeedItem}
                        />
                    </Container>
                },
            ], [roadmap?.children, feed, id]),
            refetch: useCallback(() => fetchEntity({ id }), [fetchEntity, id]),
        }
    }
)