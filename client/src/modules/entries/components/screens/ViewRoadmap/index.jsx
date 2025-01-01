import Container from "modules/Core/components/ui-kit/Container";
import Screen from "modules/Core/components/ui-kit/Screen"
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import feed from "modules/roadmaps/state/feed";
import Feed from "modules/Core/components/Feed";
import RoadmapFeedItem, { GatewayFeedItem } from "../../RoadmapFeedItem";
import Card from "modules/Core/components/ui-kit/Card";
import Title from "modules/Core/components/ui-kit/Title";
import Text from "modules/Core/components/ui-kit/Text";
import ExpandableOptions from "modules/Core/components/ui-kit/ExpandableOptions";
import AddGatewayButton from "../../AddGatewayButton";
import { useOnLoad } from "modules/Core/hooks/useOnLoad";
import EditRoadmapButton from "../../EditRoadmapButton";
import styles from "./styles.module.scss";


const RoadmapOptions = ({ id }) => (
    <ExpandableOptions
        horizontal
        options={[
            { Component: EditRoadmapButton, props: { roadmapId: id } },
            { Component: AddGatewayButton, props: { roadmapId: id } },
        ]}
    />
)

const Commponent = ({ name, text, gateways, children, id }) => (
    <Screen
        contentHeader={
            <Card maxHeight maxWidth relative >
                <Container>
                    <Title>{name}</Title>
                </Container>
                <Container>
                    <Text>{text}</Text>
                </Container>
                <Container className={styles.optionsContainer}>
                    <RoadmapOptions id={id} />
                </Container>
            </Card>
        }
        title="View Roadmap"
        back={{ to: "/", text: "Back" }}
        tripanel
        tabs={[
            {
                title: 'Active Cycle',
                Component: () => <Container>
                    <Title>Roadmaps</Title>
                    <Feed.Component
                        feed={children}
                        ItemComponent={RoadmapFeedItem}
                    />

                    <Title>Gateways</Title>
                    <Feed.Component
                        feed={gateways}
                        ItemComponent={GatewayFeedItem}
                    />

                </Container>
            },
            {
                title: 'Info',
                Component: () => "gst"
            }
        ]}
    >

    </Screen>
);

export default strappedConnected(
    Commponent,
    { roadmap: (state, { id }) => feed.cells?.fetchEntity.selector(id)(state) },
    {
        fetchEntity: feed.cells?.fetchEntity.action,
    },
    ({ roadmap, id, fetchEntity }) => {
        useOnLoad(
            () => fetchEntity({id}),
            !Boolean(roadmap?.id),
            [id]
        )
        return {
            name: roadmap?.name,
            text: roadmap?.text,
            gateways: roadmap?.gateways,
            children: roadmap?.children,
        }
    }
)