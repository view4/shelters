import { useCallback, useMemo } from "react";
import Container from "modules/Core/components/ui-kit/Container";
// import Screen from "modules/Core/components/ui-kit/Screen"
import Button from "modules/Core/components/ui-kit/Button";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import feed from "modules/roadmaps/state/feed";
import Feed from "modules/Core/components/Feed";
import RoadmapFeedItem, { GatewayExpandableOptions } from "../../RoadmapFeedItem";
import Card from "modules/Core/components/ui-kit/Card";
import Title from "modules/Core/components/ui-kit/Title";
import Text from "modules/Core/components/ui-kit/Text";
import ExpandableOptions from "modules/Core/components/ui-kit/ExpandableOptions";
import AddGatewayButton from "../../AddGatewayButton";
import { useOnLoad } from "modules/Core/hooks/useOnLoad";
import EditGatewayButton from "../../EditGatewayButton";
import styles from "./styles.module.scss";
import { STAMPS } from "modules/Core/consts";
import Stamps from "modules/Core/components/ui-kit/Stamps";
import Screen from "modules/shelter/components/Screen";


const leftAppendages = [
    {
        Component: ({ parent, gridRow }) => parent?.id && <Button className={styles.parentBtn} gridRow={gridRow} style={{ width: "100%" }} to={`/view-roadmap/${parent?.id}`} widget text={parent?.name} />,
        gridRow: 3
    }
];

const Options = ({ id, name, text }) => (
    <ExpandableOptions
        horizontal
        options={[
            { Component: EditGatewayButton, props: { gatewayId: id, name, text, } },
            { Component: AddGatewayButton, props: { parentId: id, parentName: name, refetchId: id } },
        ]}
    />
);

const Commponent = ({ name, text, id, tabs, widgetProps, stamps, refetch, parent }) => (
    <Screen
        contentHeader={
            // TODO: consider utilising RoadmapFeedItem here or having a singular unified entity for this? 
            <Card maxHeight maxWidth relative >
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
        }
        title="View Roadmap"
        back={{ text: "Back", onClick: () => window.history.back() }}
        tripanel
        leftWidgets={leftAppendages}
        widgetProps={widgetProps}
        tabs={tabs}

    />
);

export default strappedConnected(
    Commponent,
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
        const feed = useMemo(() => roadmap?.children?.map(child => ({
            ...child,
            parentId: id,
            parent: { id, name: roadmap?.name }
        })), [roadmap?.children?.length]);
        
        return {
            name: roadmap?.name,
            text: roadmap?.text,
            gateways: roadmap?.gateways,
            children: roadmap?.children,
            parent: roadmap?.parent,
            stamps: roadmap?.stamps,
            tabs: useMemo(() => [
                {
                    title: 'Gateways',
                    Component: () => <Container>
                        <Feed.Component
                            feed={feed}
                            ItemComponent={RoadmapFeedItem}
                        />
                    </Container>
                },
            ], [roadmap?.children, feed]),
            refetch: useCallback(() => fetchEntity({ id }), [fetchEntity, id]),
            widgetProps: useMemo(() => ({ parent: roadmap?.parent }), [roadmap])
        }
    }
)