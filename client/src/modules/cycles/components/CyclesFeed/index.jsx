import cx from "classnames";
import Container from "modules/Core/components/ui-kit/Container";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import feed from "modules/cycles/state/feed";
import { useMemo } from "react";
import CycleGatewayCard, { SabbaticalGatewayCard } from "../CycleGatewayCard";
import ConditionalContainer from "modules/Core/components/ui-kit/ConditionalContainer";
import FocusCycleButton from "../FocusCycleButton";
import styles from "./styles.module.scss";

const ItemComponent = ({ className, onCreateSuccess, displayFocus, ...item }) => (
    <Container className={cx(styles.container, className)} bg1 p1 flex col center>
        <CycleGatewayCard {...item.a} feedItem cycleId={item.id} orderKey={"a"} onCreateSuccess={onCreateSuccess} />
        <CycleGatewayCard {...item.b} feedItem cycleId={item.id} orderKey={"b"} onCreateSuccess={onCreateSuccess} />
        <CycleGatewayCard {...item.c} feedItem cycleId={item.id} orderKey={"c"} onCreateSuccess={onCreateSuccess} />
        <CycleGatewayCard {...item.d} feedItem cycleId={item.id} orderKey={"d"} onCreateSuccess={onCreateSuccess} />
        <CycleGatewayCard {...item.e} feedItem cycleId={item.id} orderKey={"e"} onCreateSuccess={onCreateSuccess} />
        <CycleGatewayCard {...item.f} feedItem cycleId={item.id} orderKey={"f"} onCreateSuccess={onCreateSuccess} />
        <SabbaticalGatewayCard gateway={item.sabbatical} />
        <ConditionalContainer flex m1 flexEnd shouldRender={Boolean(displayFocus)} className={styles.focusContainer}>
            <FocusCycleButton cycleId={item.id} className={styles.focusButton} onFocusCallback />
        </ConditionalContainer>
    </Container>
)

export default strappedConnected(
    feed.FeedComponent,
    {},
    { refetchFeed: () => feed.cells.fetchFeed.action({ renewStream: true }) },
    ({ boothId, isCompleted, isForthcoming, className, refetchFeed, displayFocus, onFocusCallback }) => ({
        filters: useMemo(() => ({
            boothId,
            isCompleted,
            isForthcoming
        }), [boothId, isCompleted, isForthcoming]),
        feedItemClassName: className,
        ItemComponent,
        itemProps: useMemo(() => ({ displayFocus, onFocusCallback, onCreateSuccess: refetchFeed }), [refetchFeed, displayFocus, onFocusCallback])
    })
)