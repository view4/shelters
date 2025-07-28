import { useCallback } from "react";
import feed from "modules/booths/state/feed";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import component from "./component";
import useOnSuccess from "modules/Core/sub-modules/Dialog/hooks/useOnSuccess";
import { useNavigate } from "react-router-dom";
import { useOnLoad } from "modules/Core/hooks/useOnLoad";
import authCells from "modules/auth/state";
import useOnError from "modules/Core/sub-modules/Dialog/hooks/useOnError";
import { Container } from "modules/Core/sub-modules/ui-kit/exports";
import withShouldRender from "modules/Core/higher-order-components/withShouldRender";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import withQueryParams from "modules/Core/higher-order-components/withQueryParams";

const ParentBoothFieldComponent = ({ parentId, name, id }) => {
    return (
        <Container>
            <Title>{name}</Title>
        </Container>
    )
}

const ParentBoothField = strappedConnected(
    withShouldRender(ParentBoothFieldComponent),
    {
        parent: (state, { parentId }) => feed.cells.fetchEntity.selector(parentId)(state)
    },
    {
        fetchBooths: feed.cells?.fetchFeed.action
    },
    ({ fetchBooths, parentId, ...props }) => {
        console.log({
            parentId,
            ...props
        })
        return {
            shouldRender: Boolean(parentId),
            name: parent?.name,
            id: parent?.id
        }
    }
)

export const BOOTH_SCHEMA = {
    title: "Create Booth",
    fields: {
        parentId: {
            Component: withQueryParams(ParentBoothField)
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
        create: feed.cells?.createEntity.action

    },
    ({ create, hasActiveMembership, boothCount }) => {
        const onSuccess = useOnSuccess();
        const onError = useOnError();
        const nav = useNavigate();
        const callback = useCallback((res) => {
            if (!res?.id) return null
            onSuccess(`Booth created`)
            nav(`/booths/${res?.id}`)
        }, [nav, onSuccess]);

        useOnLoad(() => {
            if (boothCount >= 1 && !hasActiveMembership) {
                onError("You have reached the limit of booths you can create - please create a membership to have access to more booths")
                nav("/booths")
            }
        }, true, [boothCount, hasActiveMembership, onError, nav])

        return {
            onSubmit: useCallback(({ name, text, parentId }) => {
                create({ input: { name, text, parentId }, callback })
            }, [callback]),
            schema: BOOTH_SCHEMA
        }
    }
);