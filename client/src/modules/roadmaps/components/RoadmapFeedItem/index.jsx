import ExpandableFeedItem from "modules/Core/components/Feed/ExpandableFeedItem";
import Container from "modules/Core/components/ui-kit/Container";
import Text from "modules/Core/components/ui-kit/Text";
import AddGatewayButton from "../AddGatewayButton";
import styles from "./styles.module.scss";
import Title from "modules/Core/components/ui-kit/Title";
import Feed from "modules/Core/components/Feed";
import Card from "modules/Core/components/ui-kit/Card";
import AddGatewayToCycleButton from "../AddGatewayToCycleButton";
import ExpandableOptions from "modules/Core/components/ui-kit/ExpandableOptions";
import EditGatewayButton from "../EditGatewayButton";
import ViewRoadmapButton from "../ViewRoadmapButton";


export const GatewayFeedItem = ({ name, text, id }) => (
    <Card header={name}>
        <ExpandableOptions
            horizontal
            className={styles.options}
            options={[
                { Component: EditGatewayButton, props: { gatewayId: id, values: { name, text } } },
                { Component: AddGatewayToCycleButton, props: { gatewayId: id } },
            ]}
        />

        <Container p1>
            <Text>
                {text}
            </Text>
        </Container>
        {/* <Container>
            <AddGatewayToCycleButton gatewayId={id} />
        </Container> */}
    </Card>
)

const RoadmapFeedItem = ({ text = "Roadmap Text", name = "Roadmap Name", gateways, id }) => (
    <ExpandableFeedItem className={styles.container} name={name} >
        <ViewRoadmapButton id={id} className={styles.viewBtn} />
        <Text>
            {text}
        </Text>
        <Container col flex flexEnd alignCenter maxWidth>
            <Title>Gateways</Title>
            <Feed.Component
                feed={gateways}
                ItemComponent={GatewayFeedItem}
            />
            <AddGatewayButton roadmapId={id} />
        </Container>
    </ExpandableFeedItem>
);

export default RoadmapFeedItem;