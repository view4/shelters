import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import IntrospectionCard from "../IntrospectionCard";
import feed from "../../state/feed";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import { BOOTH_KINDS } from "../../consts";
import RedirectButton from "modules/Core/sub-modules/ui-kit/components/RedirectButton";
import { FeedItem } from "../screens/BoothsScreen/component";
import styles from "./styles.module.scss";

const Feed = feed.FeedComponent;

const KIND_TO_ROUTE = {
    [BOOTH_KINDS.MALCHUT]: "/teachings/create",
    [BOOTH_KINDS.MAPAL]: "/mapal/create",
    [BOOTH_KINDS.LIFE]: "/create"
}

const SubBoothsCard = ({ filters, actions, title = "Sub-Booths", onClick, ...props }) => (
    <IntrospectionCard
        title={title}
        actions={actions}
        {...props}
    >
        <Feed
            ItemComponent={FeedItem}
            feedItemClassName={styles.feedItem}
            filters={filters}
            onClick={onClick}
        />
    </IntrospectionCard>
);

export default strappedConnected(
    SubBoothsCard,
    {},
    {},
    ({ parentId, kind, actions, }) => {
        const navigate = useNavigate();

        return {
            filters: useMemo(() => ({
                parentId,
                kind
            }), [parentId, kind]),
            actions: useMemo(() => actions ?? [{ Component: RedirectButton, text: "+", to: `${KIND_TO_ROUTE[kind]}?parentId=${parentId}` }], [actions, parentId, kind]),
            onClick: useCallback(({ id }) => navigate(`/booths/${id}`), [navigate])
        }
    }
);
