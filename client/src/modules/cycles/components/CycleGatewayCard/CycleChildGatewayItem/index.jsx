import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import roadmapsFeedState from "modules/roadmaps/state/feed";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";


export default ({ gatewayId }) => strappedConnected(
    ({ gateway }) => (
        <Container>
            <Text>{gateway?.name}</Text>
        </Container>
    ),
    { gateway: (state, { gatewayId }) => roadmapsFeedState.cells.fetchEntity.selector(gatewayId)(state) },
    {},
    ({ gateway }) => ({
        gateway
    })
)
