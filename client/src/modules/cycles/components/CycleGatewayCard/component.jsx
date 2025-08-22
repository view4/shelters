import { useCallback, useMemo } from "react"
import cx from "classnames";
import { useDispatch } from "react-redux";
import ExpandableCard from "modules/Core/sub-modules/ui-kit/components/Card/ExpandableCard";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Card from "modules/Core/sub-modules/ui-kit/components/Card";
import AddGatewayButton from "modules/roadmaps/components/AddGatewayButton";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";
import cells from "modules/cycles/state";
import StampGatewayButton from "modules/roadmaps/components/StampGatewayButton";
import { STAMPS } from "modules/Core/consts";
import Stamps from "modules/Core/sub-modules/ui-kit/components/Stamps";
import EditGatewayButton from "modules/roadmaps/components/EditGatewayButton";
import ExpandableOptions from "modules/Core/sub-modules/ui-kit/components/ExpandableOptions";
import { TitleWithStamps } from "modules/roadmaps/components/RoadmapFeedItem";
import ChildGateway from "./CycleChildGatewayItem"
import { Title } from "modules/Core/sub-modules/ui-kit/exports";
import styles from "./styles.module.scss";

export const EmptyGatewayCard = ({ cycleId, orderKey, onCreateSuccess }) => {
    const dispatch = useDispatch();
    const onSuccess = useCallback((result) => {
        dispatch(cells.addGatewayToCycle.action({ 
            gatewayId: result.id, 
            orderKey, 
            cycleId, 
            callback: () => onCreateSuccess()
        }))
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

export const GatewayCardTitle = ({ title,  name = title, parent, stamps, appendage }) => (
    <Container maxWidth>
        {parent?.name && <Title text={parent?.name} Element="h4" className={styles.parentText} />}
        
        <TitleWithStamps className={styles.title} title={name} stamps={stamps} appendage={appendage} />
    </Container>
)

export default ({ gateway = {}, children, refetch, remove, className, headerProps, ...props }) => {
    const stamps = useMemo(() => Object.entries(gateway?.stamps ?? {})?.map(([key, value]) => (value && { text: key?.toLowerCase(), timestamp: value })), [gateway?.stamps]);
    return (
        <ExpandableCard
            className={cx(styles.gateway, className)}
            openClassName={styles.open}
            title={<GatewayCardTitle {...headerProps} name={gateway.name} parent={gateway.parent} stamps={gateway.stamps} />}
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
                    {gateway?.childrenIds?.map(id => <ChildGateway key={id} gatewayId={id} />)}
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
