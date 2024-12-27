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
            type: "text",
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
    ({create, close, parentId="671a81eb437b0a9d2c2b0b0b", boothId = '6719809e8fd812e57b733d6d', }) => {
        const callback = useCallback((res) => {
            console.log(res)
            close()

        }, [])
        return {
            onSubmit: useCallback(({text, hours, name}) => create({name, mins: hours * 60, text, boothId, parentId}, callback), [create, boothId, parentId, callback]),
            schema
        }
    }
);