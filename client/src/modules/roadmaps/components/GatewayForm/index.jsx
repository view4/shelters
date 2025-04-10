import { useCallback, useMemo } from 'react';
import feed from 'modules/roadmaps/state/feed';
import strappedConnected from 'modules/Core/higher-order-components/strappedConnected';
import { compactObject } from 'modules/Core/utils/obj';
import useOnSuccess from 'modules/Core/sub-modules/Dialog/hooks/useOnSuccess';
import useOnError from 'modules/Core/sub-modules/Dialog/hooks/useOnError';
import component from './component';
import withFocusedBoothId from 'modules/booths/higher-order-components/withFocusedBoothId';
import GatewaySelectField from 'modules/roadmaps/components/GatewaySelectField';

const schema = {
    fields: {
        parent: {
            label: "Parent Gateway",
            Component:withFocusedBoothId(GatewaySelectField)
        },
        name: {
            type: "text",
            label: "Name",
            placeholder: "Gateway Name",
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
    ({ create, close, parentId, onSuccess, gatewayId, refetchId, parentName, initialState, refetch }) => {
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
        console.log({
            initialState
        })
        return {
            onSubmit: useCallback(({ name, text, parent }) => create(compactObject({
                name,
                text,
                parentId: parent?.id ?? parent?.key?.id,
            }), gatewayId, callback), [create, gatewayId]),
            schema,
            initialState: useMemo(() => compactObject({
                ...initialState,
                parent: initialState?.parent?.id ? {
                    name: initialState.parent.name,
                    id: initialState.parent?.id,
                    key: {
                        name: initialState.parent.name,
                        id: initialState.parent.id
                    },
                    readable: initialState.parent.name,
                } : {
                    name: parentName,
                    id: parentId,
                    key: { name: parentName, id: parentId },
                    readable: parentName,
                    disabled: Boolean(parentId),
                },
            }), [parentName, parentId, initialState])
        }
    }
);