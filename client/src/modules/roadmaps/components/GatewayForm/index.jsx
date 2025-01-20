import { useCallback, useMemo } from 'react';
import feed from 'modules/roadmaps/state/feed';
import strappedConnected from 'modules/Core/higher-order-components/strappedConnected';
import { compactObject } from 'modules/Core/utils/obj';
import useOnSuccess from 'modules/Core/sub-modules/Dialog/hooks/useOnSuccess';
import useOnError from 'modules/Core/sub-modules/Dialog/hooks/useOnError';
import component from './component';
import styles from './styles.module.scss';

const schema = {
    fields: {
        parent: {
            label: "Parent Gateway",
            type: "text",
            disabled: true,
            className: styles.parent
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
        console.log({initialState, parentName   })
        const callback = useCallback((res) => {
            const id = res?.upsertGateway?.id
            if (!Boolean(id)) return error('Creating Gateway Failed')
            success("Successful");
            close()
            onSuccess?.(res.upsertGateway);
            console.log({refetchId, id})
            refetch(refetchId ?? id)
        }, [onSuccess, refetchId]);
        return {
            onSubmit: useCallback(({ name, text }) => create(compactObject({
                name,
                text,
                parentId,
            }), gatewayId, callback), [create, parentId, gatewayId]),
            schema,
            initialState: useMemo(() => compactObject({
                ...initialState,
                parent: parentName,
            }), [parentName, parentId, initialState])
        }
    }
);