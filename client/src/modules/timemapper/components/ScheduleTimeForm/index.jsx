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
        startDate: {
            type: "date",
            label: "Start Date",
            date: true
        },
        startTime: {
            type: "time",
            time: true,
            label: "Start Time",
        },
        endDate: {
            type: "date",
            label: "End Date",
            date: true
        },
        endTime: {
            type: "time",
            time: true,
            label: "End Time",
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
    ({ create, close, boothId, refetch, onError, onSuccess, id, }) => {
        const constructDateTime = (date, time) => {
            if (!date || !time) return undefined
            const dateTime = new Date(date);
            dateTime.setHours(time.getHours(), time.getMinutes());
            return dateTime.toISOString();
        };

        const callback = useCallback((res) => {
            if (!res?.id) return onError('Failed')
            onSuccess("Success")
            close()
            refetch()
        }, [refetch, onSuccess, onError]);

        return {
            onSubmit: useCallback(({ text, startDate, startTime, endDate, endTime, name }) => {
                const start = startDate ? constructDateTime(startDate, startTime) : undefined;
                const end = endDate ? constructDateTime(endDate, endTime) : undefined;
                if (start > end) return onError("Start date should be less than end date");
                create({
                    name,
                    start,
                    end,
                    text,
                    boothId,
                }, callback, id)
            }, [create, boothId, callback, id]),
            schema
        }
    }
);