import Container from "modules/Core/components/ui-kit/Container";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import feed from "modules/cycles/state/feed";
import { useMemo } from "react";
import { CycleComponent } from "../Cycle";
import RoadmapFeedItem from "modules/roadmaps/components/RoadmapFeedItem";
import CycleGatewayCard, { SabbaticalGatewayCard } from "../CycleGatewayCard";
import styles from "./styles.module.scss";
export default strappedConnected(
    feed.FeedComponent,
    {},
    {},
    ({boothId}) => ({
        filters: useMemo(() => ({
            boothId
        }), [boothId]),
        ItemComponent: (item) => (
            <Container className={styles.container} bg1 p1 flex col center>
                <RoadmapFeedItem className={styles.item} {...item.a}/>
                <RoadmapFeedItem className={styles.item} {...item.b}/>
                <RoadmapFeedItem className={styles.item} {...item.c}/>
                <RoadmapFeedItem className={styles.item} {...item.d}/>
                <RoadmapFeedItem className={styles.item} {...item.e}/>
                <RoadmapFeedItem className={styles.item} {...item.f}/>
                <SabbaticalGatewayCard gateway={item.sabbatical} />
                {/* <CycleComponent cycle={item} boothId={boothId} /> */}
            </Container>
        )
    })
)