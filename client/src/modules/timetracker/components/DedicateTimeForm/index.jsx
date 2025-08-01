import strappedConnected from 'modules/Core/higher-order-components/strappedConnected';
import component from './component';
import feed from 'modules/timetracker/state/feed';
import { useCallback, useMemo } from 'react';
import { compactObject } from 'modules/Core/utils/obj';
import { onError, onSuccess } from 'modules/Core/sub-modules/Dialog/state/cells';

const schema = {
    fields: {
        name: {
            type: "text",
            label: "Name",
            placeholder: "Name",
            required: true,
        },
        text: {
            type: "textarea",
            label: "Text",
            placeholder: "Text",
            required: true,
        },
        hours: {
            type: "number",
            label: "Duration (Hours)",
            placeholder: "Duration",
            required: true,
            number: true
        },
    }
}

export default strappedConnected(
    component,
    {},
    {
        create: (input, callback, id) => feed.cells.createEntity.action({ input, callback, id }),
        refetch: () => feed.cells.fetchFeed.action({ renewStream: true }),
        onSuccess,
        onError,
        onImport: (dedicatedTimeId, boothId, callback) => feed.cells.createEntity.action({ input: { boothId }, callback, id: dedicatedTimeId })
    },
    ({ create, close, parentId, boothId, refetch, onError, onSuccess, id, onImport }) => {

        const callback = useCallback((res) => {
            if (!res?.id) return onError('Failed')
            onSuccess("Success")
            close()
            refetch()
        }, [refetch, onSuccess, onError]);

        const refinedSchema = useMemo(() => compactObject({
            fields: {
                ...schema.fields,
                hours: (!parentId && !id) ? false : schema.fields.hours,
            }

        }), [parentId])
        return {
            onSubmit: useCallback(({ text, hours, name }) => create({
                name,
                mins: hours * 60,
                text,
                boothId,
                parentId
            }, callback, id), [create, boothId, parentId, callback, id]),
            schema: refinedSchema,
            onImport: (dedicatedTimeId) => onImport(dedicatedTimeId, boothId, callback)
        }
    }
);