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
            type: "text",
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
    ({ create, dedicatedTimeId = "671a7fc3437b0a9d2c2b0b09" }) => {
        const callback = useCallback((res) => {
            console.log(res)
        },[])
        return {
            onSubmit: useCallback(({ text, mins }) => create({ text, mins: toInteger(mins), dedicatedTimeId }, callback), [create, dedicatedTimeId, callback]),
            schema
        }
    }
);