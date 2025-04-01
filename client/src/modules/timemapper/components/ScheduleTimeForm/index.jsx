import strappedConnected from 'modules/Core/higher-order-components/strappedConnected';
import component from './component';
import feed from 'modules/timemapper/state/feed';
import { useCallback } from 'react';
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
        start: {
            type: "date",
            label: "Start Time",
            date: true
        },
        end: {
            type: "date",
            label: "End Time",
            date: true
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
        onError
    },
    ({ create, close, boothId, refetch, onError, onSuccess, id,  }) => {
        const callback = useCallback((res) => {
            if (!res?.id) return onError('Failed')
            onSuccess("Success")
            close()
            refetch()
        }, [refetch, onSuccess, onError]);
        return {
            onSubmit: useCallback(({ text, start, end, name }) => create({
                name,
                start: start ? new Date(start).toISOString() : undefined,
                end: end ? new Date(end).toISOString() : undefined,
                text,
                boothId,
            }, callback, id), [create, boothId, callback, id]),
            schema
        }
    }
);