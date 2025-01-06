
import strappedConnected from 'modules/Core/higher-order-components/strappedConnected';
import feed from 'modules/roadmaps/state/feed';
import { useCallback } from 'react';
import component from './component';
import { compactObject } from 'modules/Core/utils/obj';
import useOnSuccess from 'modules/Core/sub-modules/Dialog/hooks/useOnSuccess';
import useOnError from 'modules/Core/sub-modules/Dialog/hooks/useOnError';

const schema = {
    fields: {
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
};

export default strappedConnected(
    component,
    {},
    { create: (input, id, callback) => feed.cells.createEntity.action({ input, callback, id }) },
    ({ create, parentId, onSuccess, roadmapId, boothId, close }) => {
        const success = useOnSuccess();
        const error = useOnError();
        const callback = useCallback((res) => {
            if (!Boolean(res?.upsertRoadmap?.id)) return error('Creating Roadmap Failed')
            success("Successful");
            close()
            onSuccess?.(res.upsertRoadmap);
        }, []);
        return {
            onSubmit: useCallback(({ name, text }) => create(compactObject({
                name,
                text,
                parentId,
                boothId,
            }), roadmapId, callback), [create, parentId, boothId, roadmapId]),
            schema
        }
    }
);