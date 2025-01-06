import { useCallback } from 'react';
import strappedConnected from 'modules/Core/higher-order-components/strappedConnected';
import component from './component';
import { compactObject } from 'modules/Core/utils/obj';
import useOnSuccess from 'modules/Core/sub-modules/Dialog/hooks/useOnSuccess';
import useOnError from 'modules/Core/sub-modules/Dialog/hooks/useOnError';
import feed from 'modules/entries/state/feed';

const schema = {
    fields: {
        name: {
            label: "Entry Title",
            type: "text",
            value: "Entry title here",
            disabled: true,
        },
        text: {
            label: "Entry Text",
            type: "textarea",
            disabled: true,
            value: "Entry Text Here "
        },
    }
};

export default strappedConnected(
    component,
    {},
    { create: (input, id, callback) => feed.cells.createEntity.action({ input, callback, id }) },
    ({ create, close, onSuccess, entryId, }) => {
        const success = useOnSuccess();
        const error = useOnError();
        const callback = useCallback((res) => {
            if (!Boolean(res?.upsertEntry?.id)) return error('Creating Entity Failed')
            success("Successful");
            close()
            onSuccess?.(res.upsertEntry.id);
        }, [onSuccess]);
        return {
            onSubmit: useCallback(({ name, text }) => create(compactObject({
                name,
                text,
            }), entryId, callback), [create, entryId, callback]),
            schema
        }
    }
);