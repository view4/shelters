import { useMemo } from "react";
import IntrospectionCard from "../IntrospectionCard";
import feed from "../../state/feed";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import { BOOTH_KINDS } from "../../consts";
import RedirectButton from "modules/Core/sub-modules/ui-kit/components/RedirectButton";

const Feed = feed.FeedComponent;

const KIND_TO_ROUTE = {
    [BOOTH_KINDS.MALCHUT]: "/teachings/create",
    [BOOTH_KINDS.MAPAL]: "/mapal/create",
    [BOOTH_KINDS.LIFE]: "/create"
}


const SubBoothsCard = ({ filters, actions, title = "Sub-Booths", ...props }) => (
    <IntrospectionCard
        title={title}
        actions={actions}
        {...props}
    >
        <Feed filters={filters} />
    </IntrospectionCard>
);

export default strappedConnected(
    SubBoothsCard,
    {},
    {},
    ({ parentId, kind, actions, }) => ({
        filters: useMemo(() => ({
            parentId,
            kind
        }), [parentId, kind]),
        actions: useMemo(() => actions ?? [{ Component: RedirectButton, text: "Create Sub-Booth", to: `${KIND_TO_ROUTE[kind]}?parentId=${parentId}` }], [actions, parentId, kind])
    })
);
