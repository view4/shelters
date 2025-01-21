import { useCallback } from 'react';
import strappedConnected from 'modules/Core/higher-order-components/strappedConnected';
import component from './component';
import cells from 'modules/timetracker/state/cells';
import { toInteger } from 'lodash';

const schema = {
    fields: {
        name: {
            type: "text",
            label: "Name",
            placeholder: "Dedicated Time Name",
            required: true,
            disabled: true,
            value: 'Dedicated Time Name',

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
    { create: (input, callback) => cells.trackTime.action({ input, callback }) },
    ({ create, dedicatedTimeId  }) => {
        const callback = useCallback((res) => {
        },[])
        return {
            onSubmit: useCallback(({ text, mins }) => create({ text, mins: toInteger(mins), dedicatedTimeId }, callback), [create, dedicatedTimeId, callback]),
            schema
        }
    }
);