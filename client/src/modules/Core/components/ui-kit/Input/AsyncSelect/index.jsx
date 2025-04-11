import { useCallback, useState } from 'react';
import Input from 'modules/Core/components/ui-kit/Input';
import useMiddleware from 'modules/Core/hooks/useMiddleware';
import { useOnLoad } from 'modules/Core/hooks/useOnLoad';

const AsyncSelect = ({ query, variables, parseResult = (r => r), throttle = 1000, ...props }) => {
    const [selection, setSelection] = useState(null);
    const { handleRequest } = useMiddleware(query, variables, parseResult);
    const fetch = useCallback(async (vars) => {
        const result = await handleRequest({
            ...variables,
            ...vars
        });
        result && setSelection(result);
    }, [query, variables, handleRequest]);
    useOnLoad(fetch);
    return <Input {...props} fetchSelection={fetch} selection={selection} />
};

export default AsyncSelect
