import { useCallback } from 'react';
import state from 'modules/roadmaps/state';
import strappedConnected from 'modules/Core/higher-order-components/strappedConnected';
import component from '../RoadmapForm/component';
import { compactObject } from 'modules/Core/utils/obj';
import useOnSuccess from 'modules/Core/sub-modules/Dialog/hooks/useOnSuccess';
import useOnError from 'modules/Core/sub-modules/Dialog/hooks/useOnError';

const schema = {
    fields: {
        roadmap: {
            label: "Roadmap",
            type: "text",
            value: "Roadmap Name here",
            disabled: true,
        },
        parent: {
            label: "Parent Gateway",
            type: "text",
            disabled: true,
        },
        name: {
            type: "text",
            label: "Name",
            placeholder: "Name",
            required: true,
        },
        text: {
            type: "textarea",
            label: "Text",
            placeholder: "Description",
            required: true,
        },
    }
}
export default strappedConnected(
    component,
    {},
    { create: (input, callback) => state.createGatewayEntity.action({ input, callback }) },
    ({ create, roadmapId, close, parentId = '671a61f5ca2d69e6571b2331', onSuccess, gatewayId }) => {
        const success = useOnSuccess();
        const error = useOnError();
        const callback = useCallback((res) => {
            if (!Boolean(res?.upsertGateway?.id)) return error('Creating Gateway Failed')
            success("Successful");
            close()
            onSuccess?.(res.upsertGateway);
        }, [onSuccess]);
        return {
            onSubmit: useCallback(({ name, text }) => create(compactObject({
                name,
                text,
                roadmapId,
                parentId
            }), callback), [create, roadmapId, parentId]),
            schema
        }
    }
);