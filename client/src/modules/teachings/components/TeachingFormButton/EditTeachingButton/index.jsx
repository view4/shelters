import { useMemo } from "react";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import TeachingFormButton from "..";
import feed from "modules/teachings/state/feed";

export default strappedConnected(
    TeachingFormButton,
    {teaching: (state, {id}) => feed.cells.fetchEntity.selector(id)(state)},
    {},
    ({teaching}) => ({
        initialValues: useMemo(() => ({
            name: teaching?.name,
            text: teaching?.text,
            parentId: teaching?.parentId,
        }), [teaching])
    })
)
