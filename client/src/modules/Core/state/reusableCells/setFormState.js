import { initCell } from 'modules/Core/core-modules/CoreModuleState/utils/cells';
import {SET_FORM_STATE } from '../consts';

export default (moduleName, {onErrorMessage } = {}) => initCell(
    moduleName,
    {
        name: SET_FORM_STATE,
        selectors: {
            getForm: (state) => state.form
        },
        reducer: (state, {payload}) => {
            state.form = payload?.formState;
        },
    }
)