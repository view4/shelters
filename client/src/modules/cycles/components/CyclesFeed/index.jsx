import cx from "classnames";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import feed from "modules/cycles/state/feed";
import { useCallback, useMemo } from "react";
import CycleGatewayCard from "../CycleGatewayCard";
import ConditionalContainer from "modules/Core/sub-modules/ui-kit/components/ConditionalContainer";
import FocusCycleButton from "../FocusCycleButton";
import SabbaticalGatewayCard from "modules/cycles/components/CycleGatewayCard/SabbaticalGatewayCard/component"
import { onSuccess } from "modules/Core/sub-modules/Dialog/state/cells";
import styles from "./styles.module.scss";

const regularGatewayKeys = ["a", "b", "c", "d", "e", "f"]

const ItemComponent = ({ className, onCreateSuccess, displayFocus, onFocusCallback, ...item }) => (
    <Container className={cx(styles.container, className)} bg1 p1 flex col center>
        {
            regularGatewayKeys.map(key => (
                <CycleGatewayCard
                    feedItem
                    cycleId={item.id}
                    gatewayId={item[key]?.id}
                    orderKey={key}
                    onCreateSuccess={onCreateSuccess}
                />
            ))
        }
        <SabbaticalGatewayCard gateway={item?.sabbatical?.gateway} />
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