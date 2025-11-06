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
import { ExpandableOptions } from "modules/Core/sub-modules/ui-kit/exports";
import CompleteCycleButton from "../CompleteCycleButton";
import { compact } from "lodash";

const regularGatewayKeys = ["a", "b", "c", "d", "e", "f"]

const ItemComponent = ({ className, refetchFeed, displayCompleteCycleButton, displayFocus, onFocusCallback, ...item }) => (
    <Container className={cx(styles.container, className)} bg1 p1 flex col center>
        <Container>
            <Container maxWidth flex flexEnd>
                <ExpandableOptions
                    tridot
                    options={compact([
                        { 
                            Component: FocusCycleButton, 
                            props: { cycleId: item.id, className: styles.focusButton, callback: onFocusCallback } 
                        },
                        displayCompleteCycleButton && { 
                            Component: CompleteCycleButton, 
                            props: { cycleId: item.id, className: styles.completeButton, callback: refetchFeed } 
                        },
                        { 
                            text: "View Cycle", 
                            props: { to: `/cycles/${item.id}` } 
                        }
                    ])}
                    optionsOrigin="right"
                />
            </Container>
        </Container>
        {
            regularGatewayKeys.map(key => (
                <CycleGatewayCard
                    feedItem
                    cycleId={item.id}
                    gatewayId={item[key]?.id}
                    orderKey={key}
                    onCreateSuccess={refetchFeed}
                />
            ))
        }
        <SabbaticalGatewayCard gateway={item?.sabbatical?.gateway} />
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
            itemProps: useMemo(() => ({ displayFocus, onFocusCallback, refetchFeed, displayCompleteCycleButton: !isCompleted }), [refetchFeed, displayFocus, onFocusCallback, isCompleted])
        })
    }
)