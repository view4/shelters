import strappedConnected from 'modules/Core/higher-order-components/strappedConnected';
import component from './component';
import feed from 'modules/timetracker/state/feed';
import { useCallback } from 'react';

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


export default  strappedConnected(
    component, 
    {}, 
    {create: (input, callback) =>  feed.cells.createEntity.action({input, callback})},
    ({create, close, parentId, boothId, }) => {
        const callback = useCallback((res) => {
            close()
        }, [])
        return {
            onSubmit: useCallback(({text, hours, name}) => create({name, mins: hours * 60, text, boothId, parentId}, callback), [create, boothId, parentId, callback]),
            schema
        }
    }
);