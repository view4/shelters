import { useCallback, useMemo } from 'react';
import strappedConnected from 'modules/Core/higher-order-components/strappedConnected';
import component from './component';
import cells from 'modules/timetracker/state/cells';
import { toInteger } from 'lodash';
import { onError, onSuccess } from 'modules/Core/sub-modules/Dialog/state/cells';

const schema = {
    fields: {
        name: {
            type: "text",
            label: "Name",
            placeholder: "Dedicated Time Name",
            disabled: true,
        },
        text: {
            type: "textarea",
            label: "Text",
            placeholder: "Text",
            required: true,
        },
        mins: {
            type: "number",
            label: "Duration (Minutes)",
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
        create: (input, callback, id) => cells.trackTime.action({ input, callback, id }),
        trackExisting: (trackedTimeId, dedicatedTimeId, callback) => cells.trackTime.action({ 
            input: { dedicatedTimeId }, 
            callback, 
            id: trackedTimeId 
        }),
        dialogSuccess: onSuccess,
        dialogError: onError
    },
    ({
        create,
        trackExisting,
        dedicatedTimeId,
        close,
        dialogSuccess,
        onSuccess,
        initialState,
        dedicatedTimeName,
        dialogError,
        id,

    }) => {
        const callback = useCallback((res) => {
            if (!res?.id) return dialogError("Faiiled")
            dialogSuccess("Success")
            onSuccess?.()
            close()
        }, []);
        const refinedInitialState = useMemo(() => ({
            name: dedicatedTimeName,
            ...initialState
        }), [dedicatedTimeName, dedicatedTimeId])
        
        const onSelectTrackedTimeCallback = useCallback((trackedTime) => {
            trackExisting(trackedTime.id, dedicatedTimeId, callback);
        }, [trackExisting, dedicatedTimeId, callback]);
        
        return {
            onSubmit: useCallback(({ text, mins }) => create({
                text,
                mins: toInteger(mins),
                dedicatedTimeId
            }, callback, id), [create, dedicatedTimeId, callback, id]),
            schema,
            initialState: refinedInitialState,
            onSelectTrackedTime: dedicatedTimeId ? onSelectTrackedTimeCallback : undefined
        }
    }
);