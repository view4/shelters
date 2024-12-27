import { initCell } from 'modules/Core/core-modules/CoreModuleState/utils/cells';
import {SET_FORM_FIELD } from '../consts';

export default (moduleName, {onErrorMessage } = {}) => initCell(
    moduleName,
    {
        name: SET_FORM_FIELD,
        selectors: {
            getForm: (state) => state.form,
            isLoading: (state) => state.isLoading
        },
        reducer: (state, {payload}) => {
            const {reset, ...filters} = payload;
            state.form[payload?.key] = payload?.value;
        },
    }
)