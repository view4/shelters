import { useCallback, useMemo } from 'react';
import feed from 'modules/roadmaps/state/feed';
import strappedConnected from 'modules/Core/higher-order-components/strappedConnected';
import { compactObject } from 'modules/Core/utils/obj';
import useOnSuccess from 'modules/Core/sub-modules/Dialog/hooks/useOnSuccess';
import useOnError from 'modules/Core/sub-modules/Dialog/hooks/useOnError';
import withFocusedBoothId from 'modules/booths/higher-order-components/withFocusedBoothId';
import GatewaySelectField from 'modules/roadmaps/components/GatewaySelectField';
import component from './component';

const schema = {
    fields: {
        parent: {
            label: "Parent Roadmap",
            Component: withFocusedBoothId(GatewaySelectField)
        },
        name: {
            type: "text",
            label: "Name",
            placeholder: "Roadmap Name",
            required: true,
        },
        text: {
            type: "textarea",
            label: "Text",
            placeholder: "Description",
            required: true,
        },
    }
};

export default strappedConnected(
    component,
    {},
    {
        create: (input, id, callback) => feed.cells.createEntity.action({ input, callback, id }),
        refetch: (id) => feed.cells.fetchEntity.action({ id })
    },
    ({ create, close, parentId, onSuccess, gatewayId, refetchId, parentName, initialState, refetch, title }) => {
        const success = useOnSuccess();
        const error = useOnError();
        const callback = useCallback((res) => {
            const id = res?.upsertGateway?.id
            if (!Boolean(id)) return error('Creating Gateway Failed')
            success("Successful");
            close()
            onSuccess?.(res.upsertGateway);
            refetch(refetchId ?? id)
        }, [onSuccess, refetchId]);

        const parent = useMemo(() => initialState?.parent ? initialState.parent : parentId && { id: parentId, name: parentName }, [initialState?.parent?.id, parentId, parentName])
        return {
            onSubmit: useCallback(({ name, text, parent }) => create(compactObject({
                name,
                text,
                parentId: parent?.id,
            }), gatewayId, callback), [create, gatewayId, callback]),
            schema,
            initialState: useMemo(() => compactObject({
                ...initialState,
                parent: parent && {
                    name: parent?.name,
                    id: parent?.id,
                    key: parent?.id,
                    readable: parent?.name,
                },
            }), [parent, initialState]),
            title: useMemo(() => Boolean(title) ? title : Boolean(parent) ? "Add Roadmap Step": "Add Roadmap", [title, parent])

        }
    }
);