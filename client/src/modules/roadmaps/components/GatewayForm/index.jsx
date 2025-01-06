import { useCallback } from 'react';
import state from 'modules/roadmaps/state';
import strappedConnected from 'modules/Core/higher-order-components/strappedConnected';
// import component from '../AddRoadmapForm/component';
import { compactObject } from 'modules/Core/utils/obj';
import useOnSuccess from 'modules/Core/sub-modules/Dialog/hooks/useOnSuccess';
import useOnError from 'modules/Core/sub-modules/Dialog/hooks/useOnError';
import component from './component';
import feed from 'modules/roadmaps/state/feed';

const schema = {
    fields: {
        roadmap: {
            label: "Roadmap",
            type: "text",
            value: "Roadmap Name here",
            disabled: true,
        },
        parent: {
            // TODO: Display Parent Gateway here
            label: "Parent Gateway",
            type: "text",
            disabled: true,
            value: "Parent Gateway Here (optional)"
        },
        name: {
            type: "text",
            label: "Name",
            placeholder: "Dedicated Time Name",
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
    { create: (input, id, callback) => feed.cells.create.action({ input, callback, id }) },
    ({ create,  close, parentId, onSuccess, gatewayId }) => {
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
                // roadmapId,
                parentId,
            }), gatewayId, callback), [create, parentId, gatewayId]),
            schema
        }
    }
);