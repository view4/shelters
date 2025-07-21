import { useCallback, useMemo } from "react"
import cx from "classnames";
import { useDispatch } from "react-redux";
import ExpandableCard from "modules/Core/components/ui-kit/Card/ExpandableCard";
import Container from "modules/Core/components/ui-kit/Container";
import Card from "modules/Core/components/ui-kit/Card";
import AddGatewayButton from "modules/roadmaps/components/AddGatewayButton";
import Text from "modules/Core/components/ui-kit/Text";
import cells from "modules/cycles/state";
import StampGatewayButton from "modules/roadmaps/components/StampGatewayButton";
import { STAMPS } from "modules/Core/consts";
import Stamps from "modules/Core/components/ui-kit/Stamps";
import EditGatewayButton from "modules/roadmaps/components/EditGatewayButton";
import ExpandableOptions from "modules/Core/components/ui-kit/ExpandableOptions";
import  { TitleWithStamps } from "modules/roadmaps/components/RoadmapFeedItem";
import ChildGateway from "./CycleChildGatewayItem"
import styles from "./styles.module.scss";

export const EmptyGatewayCard = ({ cycleId, orderKey, onCreateSuccess }) => {
    const dispatch = useDispatch();
    const onSuccess = useCallback((result) => {
        dispatch(cells.addGatewayToCycle.action({ gatewayId: result.id, orderKey, cycleId, callback: () => onCreateSuccess() }))
    }, [cycleId, orderKey, onCreateSuccess]);
    return (
        <Card className={styles.emptyCard}>
            <Container flex spaceBetween alignCenter >
                <Text>Empty</Text>
                <AddGatewayButton
                    cycleId={cycleId}
                    onSuccess={onSuccess}
                    onSelectGateway={onSuccess}
                />
            </Container>
        </Card>
    )
};

export default ({ gateway = {}, children, refetch, remove, className, ...props }) => {
    const stamps = useMemo(() => Object.entries(gateway?.stamps ?? {})?.map(([key, value]) => (value && { text: key?.toLowerCase(), timestamp: value })), [gateway?.stamps]);
    return (
        <ExpandableCard
            className={cx(styles.gateway, className)}
            title={<TitleWithStamps title={gateway.name} stamps={gateway.stamps} />}
            size={"lg"} {...props}>
            <ExpandableOptions
                className={styles.options}
                horizontal
                options={[
                    { text: "Remove", onClick: remove },
                    {
                        Component: EditGatewayButton, props: {
                            gatewayId: gateway?.id,
                            onSuccess: refetch,
                            name: gateway?.name,
                            text: gateway?.text,
                            parent: gateway?.parent,
                            parentName: gateway?.parent?.name
                        }
                    },
                    {
                        Component: StampGatewayButton, props: {
                            stampKey: STAMPS.COMMENCED,
                            gatewayId: gateway?.id,
                            shouldRender: !gateway?.stamps?.[STAMPS.COMMENCED],
                            text: "Stamp Commenced",
                            callback: refetch
                        }
                    },
                    {
                        Component: StampGatewayButton, props: {
                            stampKey: STAMPS.COMPLETED,
                            gatewayId: gateway?.id,
                            shouldRender: !gateway?.stamps?.[STAMPS.COMPLETED] && Boolean(gateway?.stamps?.[STAMPS.COMMENCED]),
                            text: "Stamp Completed",
                            callback: refetch
                        }
                    },
                    { Component: AddGatewayButton, props: { parentId: gateway?.id, parentName: gateway?.name, refetchId: gateway?.id } },

                ]}
            />
            <Container relative maxHeight maxWidth>
                <Container mt1>
                    {gateway?.text}
                    {children}
                    {gateway?.childrenIds?.map(id => <ChildGateway gatewayId={id} />)}
                    <Container flex flexEnd mt3 >
                        <Container>
                            <Stamps stamps={stamps} />
                        </Container>
                    </Container>
                </Container>
            </Container>
        </ExpandableCard>
    )
};
