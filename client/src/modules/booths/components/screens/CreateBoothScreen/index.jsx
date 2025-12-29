import { useCallback } from "react";
import feed from "modules/booths/state/feed";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import component from "./component";
import useOnSuccess from "modules/Core/sub-modules/Dialog/hooks/useOnSuccess";
import { useNavigate } from "react-router-dom";
import authCells from "modules/auth/state";
import withQueryParams from "modules/Core/higher-order-components/withQueryParams";

import BoothParentField from "../../BoothParentField";

export const BOOTH_SCHEMA = {
    title: "Create Booth",
    fields: {
        parentId: {
            Component: withQueryParams(BoothParentField),
            wrapperClassName: 'parent-field'
        },
        name: {
            type: "text",
            label: "Name",
            required: true,
        },
        text: {
            type: "textarea",
            label: "Text Space",
            required: true,
        },
    }
};

export default strappedConnected(
    component,
    {
        hasActiveMembership: authCells.validateToken.selectors.hasActiveMembership,
        boothCount: authCells.validateToken.selectors.boothCount,
    },
    {
        create: feed.cells?.createEntity.action,
        refetchUser: authCells.validateToken.action
    },
    ({ create, refetchUser }) => {
        const onSuccess = useOnSuccess();
        const nav = useNavigate();
        const callback = useCallback((res) => {
            if (!res?.id) return null
            refetchUser()
            onSuccess(`Booth created`)
            nav(`/booths/${res?.id}`)
        }, [nav, onSuccess, refetchUser]);

        // DISABLED FOR NOW:
        // useOnLoad(() => {
        //     if (boothCount >= 1 && !hasActiveMembership) {
        //         onError("You have reached the limit of booths you can create - please create a membership to have access to more booths")
        //         nav("/booths")
        //     }
        // }, true, [boothCount, hasActiveMembership, onError, nav])

        return {
            onSubmit: useCallback(({ name, text, parentId }) => {
                create({ input: { name, text, parentId }, callback })
            }, [callback]),
            schema: BOOTH_SCHEMA
        }
    }
);