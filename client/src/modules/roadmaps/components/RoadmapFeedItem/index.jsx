import ExpandableFeedItem from "modules/Core/components/Feed/ExpandableFeedItem";
import Container from "modules/Core/components/ui-kit/Container";
import Text from "modules/Core/components/ui-kit/Text";
import AddGatewayButton from "../AddGatewayButton";
import Title from "modules/Core/components/ui-kit/Title";
import Feed from "modules/Core/components/Feed";
import Card from "modules/Core/components/ui-kit/Card";
import AddGatewayToCycleButton from "../AddGatewayToCycleButton";
import ExpandableOptions from "modules/Core/components/ui-kit/ExpandableOptions";
import EditGatewayButton from "../EditGatewayButton";
import ViewRoadmapButton from "../ViewRoadmapButton";
import StampGatewayButton from "../StampGatewayButton";
import { STAMPS } from "modules/Core/consts";
import Stamps from "modules/Core/components/ui-kit/Stamps";
import styles from "./styles.module.scss";

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

const RoadmapFeedItem = ({ text = "Roadmap Text", name = "Roadmap Name", stamps, children, id }) => (
    <ExpandableFeedItem className={styles.container} name={name} >
        <Container col flex spaceBetween>
            <ViewRoadmapButton id={id} className={styles.viewBtn} />
            <ExpandableOptions
                horizontal
                className={styles.options}
                options={[
                    { Component: EditGatewayButton, props: { gatewayId: id, values: { name, text } } },
                    { Component: AddGatewayToCycleButton, props: { gatewayId: id } },
                ]}
            />
        </Container>

        <Text>
            {text}
        </Text>
        <Container col flex flexEnd alignCenter maxWidth>
            <Title>Gateways</Title>
            <Feed.Component
                feed={children}
                ItemComponent={RoadmapFeedItem}
            />
            <AddGatewayButton roadmapId={id} />
        </Container>

        <Container flex spaceBetween>
            <Container>
                <StampGatewayButton
                    text={"Stamp Commenced"}
                    stampKey={STAMPS.COMMENCED}
                    gatewayId={id}
                    shouldRender={!stamps?.[STAMPS.COMMENCED]}
                />
                <StampGatewayButton
                    text={"Stamp Completed"}
                    stampKey={STAMPS.COMPLETED}
                    gatewayId={id}
                    shouldRender={!stamps?.[STAMPS.COMPLETED] && Boolean(stamps?.[STAMPS.COMMENCED])}
                />
            </Container>
            <Container>
                <Stamps stamps={stamps} />
            </Container>
        </Container>
    </ExpandableFeedItem>
);

export default RoadmapFeedItem;