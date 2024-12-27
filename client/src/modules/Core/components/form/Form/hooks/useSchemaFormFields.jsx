import { useState, useMemo, useEffect } from 'react';
import SchemaFormField from '../SchemaFormField';
import { useDispatch } from 'react-redux';
import { SET_FORM_STATE } from 'modules/Core/state/consts';

export default (schema, initialState = {}, options = {}) => {
    const [state, setState] = useState(initialState);
    const dispatch = useDispatch();

    const localFields = useMemo(() => !Boolean(options?.useUnifiedState) && (<>
        {Object.entries(schema?.fields ?? {}).map(([key, field]) => field && (
            <SchemaFormField
                {...options}
                key={key}
                value={state[key] ?? getEmptyValue(field.type)}
                onChange={(value) => setState(prev => ({ ...prev, [key]: value }))}
                {...field}
            />
        ))}
    </>), [schema?.fields, state, options]);

    const unifiedFields = useMemo(() => Boolean(options?.useUnifiedState) && (<>
        {Object.entries(schema?.fields ?? {}).map(([key, field]) => field && (
            <SchemaFormField
                {...options}
                key={key}
                moduleName={options?.moduleName}
                formFieldsKey={key}
                {...field}
            />
        ))}
    </>), [schema?.fields, options]);

    const fields = useMemo(() => Boolean(Object.keys(schema?.fields ?? {}).length) && (localFields || unifiedFields), [localFields, unifiedFields])
    useEffect(() => {
        if (options?.asyncInitialState && Boolean(!options?.useUnifiedState)) {
            Object.entries(initialState).forEach(([key, value]) => {
                setState(prev => ({ ...prev, [key]: value }))
            })
        }
        if (options?.useUnifiedState && Boolean(Object.values(initialState)?.length) && options.moduleName) {
            dispatch({
                type: options.moduleName + '/' + SET_FORM_STATE,
                payload: {
                    formState: initialState
                }
            })

        }
    }, [options?.asyncInitialState, initialState])


    return { fields, state, setState }
};

const TYPE_TO_EMPTY_VALUE = {
    text: "",
    string: "",
    number: "",
    textarea: "",
};

const getEmptyValue = (type) => TYPE_TO_EMPTY_VALUE[type] ?? null;