import cx from "classnames";
import Container from "modules/Core/components/ui-kit/Container";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import feed from "modules/cycles/state/feed";
import { useCallback, useMemo } from "react";
import CycleGatewayCard from "../CycleGatewayCard";
import ConditionalContainer from "modules/Core/components/ui-kit/ConditionalContainer";
import FocusCycleButton from "../FocusCycleButton";
import styles from "./styles.module.scss";
import SabbaticalGatewayCard from "modules/cycles/components/CycleGatewayCard/SabbaticalGatewayCard/component"
import { onSuccess } from "modules/Core/sub-modules/Dialog/state/cells";

const ItemComponent = ({ className, onCreateSuccess, displayFocus, onFocusCallback, ...item }) => (
    <Container className={cx(styles.container, className)} bg1 p1 flex col center>
        <CycleGatewayCard {...item.a} feedItem cycleId={item.id} orderKey={"a"} onCreateSuccess={onCreateSuccess} />
        <CycleGatewayCard {...item.b} feedItem cycleId={item.id} orderKey={"b"} onCreateSuccess={onCreateSuccess} />
        <CycleGatewayCard {...item.c} feedItem cycleId={item.id} orderKey={"c"} onCreateSuccess={onCreateSuccess} />
        <CycleGatewayCard {...item.d} feedItem cycleId={item.id} orderKey={"d"} onCreateSuccess={onCreateSuccess} />
        <CycleGatewayCard {...item.e} feedItem cycleId={item.id} orderKey={"e"} onCreateSuccess={onCreateSuccess} />
        <CycleGatewayCard {...item.f} feedItem cycleId={item.id} orderKey={"f"} onCreateSuccess={onCreateSuccess} />
        <SabbaticalGatewayCard gateway={item.sabbatical} />
        <ConditionalContainer flex m1 mt3 flexEnd shouldRender={Boolean(displayFocus)} className={styles.focusContainer}>
            <FocusCycleButton cycleId={item.id} className={styles.focusButton} callback={onFocusCallback} />
        </ConditionalContainer>
    </Container>
)

export default strappedConnected(
    feed.FeedComponent,
    {},
    {
        refetchFeed: () => feed.cells.fetchFeed.action({ renewStream: true }),
        onSuccess
    },
    ({ boothId, isCompleted, isForthcoming, className, refetchFeed, displayFocus, onSuccess }) => {
        const onFocusCallback = useCallback(() => {
            onSuccess("Cylce focused");
            refetchFeed();
        }, [onSuccess, refetchFeed]);


        return ({
            filters: useMemo(() => ({
                boothId,
                isCompleted,
                isForthcoming
            }), [boothId, isCompleted, isForthcoming]),
            feedItemClassName: className,
            ItemComponent,
            itemProps: useMemo(() => ({ displayFocus, onFocusCallback, onCreateSuccess: refetchFeed }), [refetchFeed, displayFocus, onFocusCallback])
        })
    }
)